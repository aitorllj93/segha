import { Video } from "@segha/tmdb";

export const getVideoUrl = (video: Video): string | undefined => {
  if (video.site === 'YouTube') {
    return `https://youtube.com/watch?v=${video.key}`;
  }

  return undefined;
}

export const getTrailerUrl = (videos: Video[] = []): string | undefined => {
  if (!videos.length) {
    return undefined;
  }

  let video: Video;

  if (videos.length === 1) {
    video = videos[0];
  } else {
    const ytVideos = videos.filter(v => v.site === 'YouTube');
    video = ytVideos.find(v => v.type === 'Teaser') ?? ytVideos[0];
  }

  if (!video) {
    return undefined;
  }

  return getVideoUrl(video);
}
