const nodeEnv = process.env.NODE_ENV
const nameSpace = nodeEnv == 'development' ? '/dev-api' : ''
export const BASE_PICTURE_URL = `${nameSpace}/admin/nos/upload`
// export const BASE_VIDEO_URL = '/domainPath/admin/nos/uploadStream.html'
export const BASE_VIDEO_URL = `${nameSpace}/admin/nos/uploadStream.html`
// export const BASE_AUDIO_URL = '/domainPath/admin/nos/uploadAudioAndDuration.html'
export const BASE_AUDIO_URL = `${nameSpace}/admin/nos/uploadAudioAndDuration.html`
