const fs = require('fs');

exports.getGenres = (path) => {
    const data = fs.readFileSync(path);
    const genres = JSON.parse(data).list;
    return genres;
}

exports.addGenre = (path, newGenre) => {
    const data = fs.readFileSync(path);
    const genres = JSON.parse(data).list;

    const genresExists = genres.find(elem => elem == newGenre);

    if (genresExists) {
        return {
            success: true,
            message: "Already exists"
        };
    } else {
        genres.push(newGenre);
        let temp = JSON.stringify({ list: genres }, null, 2)
        
        fs.writeFileSync(path, temp, (err) => {
            if (err) throw(err)
            return {
                success: true,
                message: "Genre added"
            };
        });
        return {
            success: true,
            message: "Genre added"
        };
    }
}