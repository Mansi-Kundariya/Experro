import { CommonUtilities } from "./common";

const envSuffixes = {
  dev: "-dev",
  staging: "-staging",
  prod: ""
};

function getMediaDomainByEnv(domainHash, environmentType) {
  const envSuffix = envSuffixes[environmentType] || envSuffixes.prod;
  if (window.location.hostname.includes('-demo')) {
    return `https://${domainHash}.myexperro-demo.com`;
  }
  return `https://${domainHash}.myexperro${envSuffix}.com`;
}

function getUIBuilderMediaHost(domain, fallbackDomain) {
  if(domain) {
    const [domainHash, domainType] = domain.split('.');
    const envType = domainType.split('-')[1];
    return getMediaDomainByEnv(domainHash.split('-')[0], envType);
  } else {
    return fallbackDomain;
  }
}

function isExperroDomain(domain) {
  return ['experro-dev.app', 'myexperro-dev.com', 'experro-staging.app', 'myexperro-staging.com', 'experro.app', 'myexperro.com','myexperro-demo.com']
    .some(allowedDomain => domain.indexOf(allowedDomain) > -1);
}

export { getUIBuilderMediaHost }
