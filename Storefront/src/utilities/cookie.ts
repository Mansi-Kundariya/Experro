export class Cookie {
  static get(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  static delete(name: string) {
    if (this.get(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  static set({
    name,
    value,
    expirationTime = null,
  }: {
    name: string;
    value: string;
    expirationTime?: Date;
  }) {
    const now = new Date();
    const expire = expirationTime?.toString()?.length
      ? expirationTime
      : new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
    document.cookie = `${name}=${value}; expires=${expire.toUTCString()}; path=/`;
  }
}
