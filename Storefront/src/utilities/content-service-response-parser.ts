export function contentServiceResponseParser(response: any) {
  try {
    if(response.Status === 'failure') {
      return;
    }
    const { Data, Status } = response;
    const { meta, records } = Data;
    const { total_rows } = meta;

    const transformed_records = records?.map((record_data: any) => {
      let transformed_record = {};

      Object.keys(record_data).forEach((key) => {
        if (key !== 'version_data') {
          transformed_record[key] = record_data[key];
        }
      });

      if (record_data?.version_data) {
        transformed_record = {
          ...transformed_record,
          ...record_data['version_data'],
        };
      }
      return transformed_record;
    });
    return {
      Status,
      Data: {
        items: transformed_records,
        total_record: total_rows,
      },
    };
  } catch (e) {
    console.error(
      e,
      'Something went wrong at parsing content service response'
    );
    return response;
  }
}
