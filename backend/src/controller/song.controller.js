const songModel = require("../models/song.model");
const { uploadFile } = require("../services/auth.services");
const id3 = require("node-id3");

async function uploadSong(req, res) {
    try {
        const songBuffer = req.file.buffer;
        const { mood } = req.body;

        const tags = id3.read(songBuffer);

        const [songFile, posterFile] = await Promise.all([
            uploadFile({
                buffer: songBuffer,
                filename: tags.title + ".mp3",
                folder: "/cohort-2/moodify/songs"
            }),

            uploadFile({
                buffer: tags.image.imageBuffer,
                filename: tags.title + ".jpeg",
                folder: "/cohort-2/moodify/posters"
            })
        ]);

         console.log("SONG URL:", songFile.url)
         console.log("POSTER URL:", posterFile.url)



        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood
        });

        res.status(201).json({
            message: "song created successfully",
            song
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSong(req, res) {
    try {
        const { mood } = req.query;

        const song = await songModel.find({
            mood
        });

        res.status(200).json({
            message: "song fetched successfully",
            song
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    uploadSong,
    getSong
};