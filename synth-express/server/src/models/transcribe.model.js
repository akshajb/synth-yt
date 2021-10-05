import YoutubeTranscript from "youtube-transcript";

exports.transcribeYoutube = (id) => {
  return YoutubeTranscript.fetchTranscript(id, { lang: "en" });
};
