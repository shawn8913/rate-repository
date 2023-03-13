const parseSortBy = (sortBy) => {
  let variablesObject
  switch (sortBy) {
    case 'Latest repositories':
      variablesObject = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      }
      break
    case 'Oldest repositories':
      variablesObject = {
        orderBy: 'CREATED_AT',
        orderDirection: 'ASC',
      }
      break
    case 'Highest rated repositories':
      variablesObject = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      }
      break
    case 'Lowest rated repositories':
      variablesObject = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      }
      break
    case '':
      variablesObject = {}
  }

  return variablesObject
}

export default parseSortBy
