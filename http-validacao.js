const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function handleErrors(error) {
    throw new Error(error.message);
  }
  
  async function statusCheck(arrayURLs) {
    try {
      const arrayStatus = await Promise
        .all(arrayURLs
          .map(async url => {
            const res = await fetch(url)
            return `${res.status} - ${res.statusText}`;
      }))
      return arrayStatus;
    } catch(error) {
      handleErrors(error);
    }
  }
  
  function generateArrURL(arrayLinks) {
    return arrayLinks
      .map(objetoLink => Object
        .values(objetoLink).join());
  }
  
  async function validateURL(arrayLinks) {
    const links = generateArrURL(arrayLinks);
    const statusLinks = await statusCheck(links);
    
    const results = arrayLinks.map((object, index) => ({
      ...object,
      status: statusLinks[index]
    }))
    return results;
  }
  
  module.exports = validateURL;