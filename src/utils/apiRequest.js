// import fetch from 'isomorphic-fetch';
// import map from 'lodash/map';
// import pickBy from 'lodash/pickBy';

// export function isNullOrUndefined(data) {
//   return (data === null || data === undefined);
// }

// export function searchParams(params, transformArray = false) {
//   const cleanedParams = pickBy(params, (v) => !isNullOrUndefined(v));
//   return map(cleanedParams, (value, key) => {
//     if (transformArray && Array.isArray(value)) {
//       return value.map(v => `${key}[]=${v}`).join('&');
//     } else {
//       return `${key}=${value}`;
//     }
//   }).join('&');
// }

// export async function parseJsonResponse(response) {
//   let json = null;
//   try {
//     json = await response.json();
//   } catch (e) {
//     // TODO Do something if response has no, or invalid JSON
//     console.error(e);
//   }

//   if (response.headers.has('X-Flash-Messages')) {
//     const flashHeader = response.headers.get('X-Flash-Messages') || '{}';
//     const { error, notice } = JSON.parse(flashHeader) || {};
//     if (error || notice) {
//       json ||= {};
//       json.flashError = error || notice;
//     }

//     if (error) {
//       window.GTMtracker?.pushEvent({
//         event: 'gtm_custom_click',
//         data: {
//           click_text: error,
//           click_type: 'Flash error',
//         },
//       });
//     }
//   }

//   if (response.ok) {
//     return json;
//   } else {
//     const error = new Error(response.statusText);
//     error.isFromServer = true;
//     error.response = response;
//     error.responseJson = json;

//     throw error;
//   }
// }


// export async function apiRequest(method, path, body = null, options = {}) {
//   let defaultHeaders = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//     'X-Accept-Flash': true,
//   };

//   // TODO Remove DOM dependency from this file
//   const csrfMeta = document.querySelector('meta[name="csrf-token"]');
//   if (csrfMeta) {
//     defaultHeaders['X-CSRF-Token'] = csrfMeta.content;
//   }

//   const defaultOptions = { method };

//   if (options.dataType === 'FormData') {
//     delete defaultHeaders['Content-Type'];
//     defaultOptions.body = body;
//   } else if (body && method !== 'GET') {
//     defaultOptions.body = JSON.stringify(body);
//   }

//   const { headers, params, ...remainingOptions } = options;
//   const finalOptions = Object.assign(
//     defaultOptions,
//     { headers: Object.assign(defaultHeaders, headers) },
//     { credentials: 'same-origin' },
//     remainingOptions,
//   );

//   const response = await fetch(path, finalOptions);
//   return parseJsonResponse(response);
// }