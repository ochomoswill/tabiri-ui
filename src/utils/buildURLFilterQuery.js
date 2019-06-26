let buildURLFilterQuery = (reqParams) => {
	const {page, pageSize, fields, filterArr, strategy, activePage} = reqParams;

	let reqParamArr = [];

  if (page !== undefined) {
    reqParamArr.push(`page=${page}`)
  }

  if (pageSize !== undefined) {
    reqParamArr.push(`pageSize=${pageSize}`)
  }

  if (fields !== undefined) {
    reqParamArr.push(`fields=${fields}`)
  }

  if (filterArr !== undefined) {
    if (filterArr.length > 0) {
      filterArr.map((filter) => {
        return reqParamArr.push(`filter=${filter}`)
      });

      if (strategy) {
        reqParamArr.push(`strategy=${strategy}`)
      }
    }
  }

  if (activePage !== undefined) {
    reqParamArr.push(`activePage=${activePage}`)
  }


  if (reqParamArr.length > 0) {
    reqParamArr[0] = '?' + reqParamArr[0];
    return reqParamArr.join('&');
  }

  return ""
};

let buildGenerateReportQuery = (reqParams) => {
  const {page, pageSize, reportName, reportType, fileType, fields, filterArr, strategy, activePage} = reqParams;

  let reqParamArr = [];

  if (page !== undefined) {
    reqParamArr.push(`page=${page}`)
  }

  if (pageSize !== undefined) {
    reqParamArr.push(`pageSize=${pageSize}`)
  }

  if (reportName !== undefined) {
    reqParamArr.push(`reportName=${reportName}`)
  }

  if (reportType !== undefined) {
    reqParamArr.push(`reportType=${reportType}`)
  }

  if (fileType !== undefined) {
    reqParamArr.push(`fileType=${fileType}`)
  }

  if (fields !== undefined) {
    reqParamArr.push(`fields=${fields}`)
  }

  if (filterArr !== undefined) {
    if (filterArr.length > 0) {
      filterArr.map((filter) => {
        return reqParamArr.push(`filter=${filter}`)
      });

      if (strategy) {
        reqParamArr.push(`strategy=${strategy}`)
      }
    }
  }

  if (activePage !== undefined) {
    reqParamArr.push(`activePage=${activePage}`)
  }


  if (reqParamArr.length > 0) {
    reqParamArr[0] = '?' + reqParamArr[0];
    return reqParamArr.join('&');
  }

	return ""
};

export default {
	buildURLFilterQuery,
	buildGenerateReportQuery
}
