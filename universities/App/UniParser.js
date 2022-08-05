const UniParser = {}

UniParser.parser = async (university) => {

    const parsed_uni = {
        country : university.country,
        university : university.name
    }
    
    return parsed_uni
}


module.exports = UniParser

