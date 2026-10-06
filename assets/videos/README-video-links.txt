VIDEO LINKS GUIDE
=================
Broadcast Authority Portfolio — Video Embedding Instructions

All videos in this portfolio play DIRECTLY inside the page.
Visitors never leave to YouTube or Facebook.
This is achieved using "embed" links — not normal watch links.

=================================================================
YOUTUBE VIDEOS
=================================================================

STEP 1: Go to the YouTube video you want to add.

STEP 2: Click the SHARE button below the video.

STEP 3: Click EMBED.

STEP 4: Look for the "src" inside the iframe code that appears.
        It looks exactly like this:
        https://www.youtube.com/embed/dQw4w9WgXcQ

STEP 5: Copy ONLY that URL. Do not copy the full <iframe> code.

STEP 6: Open js/data.js, find the "programs" list, and paste the link
        as the "link" value of a video entry:

        link: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        (Shortcut: js/data.js also accepts a normal YouTube link such as
         https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ
         and converts it to the embed link automatically.)

✅ CORRECT (embed link):
   https://www.youtube.com/embed/dQw4w9WgXcQ

❌ WRONG (normal watch link — will NOT work):
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   https://youtu.be/dQw4w9WgXcQ

The only difference is the word "embed" in the URL.
If your link has "watch?v=" or "youtu.be", it is the wrong link.

=================================================================
FACEBOOK VIDEOS
=================================================================

STEP 1: Go to the Facebook video you want to embed.

STEP 2: Click the three dots (...) on the post.

STEP 3: Click EMBED.

STEP 4: Facebook will show embed code. Find the "src" URL.
        It looks like this:
        https://www.facebook.com/plugins/video.php?href=https%3A%2F%2F...

STEP 5: Copy that URL and paste it as the "link" value in js/data.js.
        (A normal Facebook video URL also works; it is converted automatically.)

STEP 6: Optional: set  platform: "facebook"  (it is detected automatically from the link).

IMPORTANT NOTE ABOUT FACEBOOK:
Facebook embed may require your website to be published online
at a real URL (not localhost) for the embed to work.
If testing locally, the Facebook video may show as a placeholder.
This is normal — it will work once the site is deployed online.

=================================================================
GALLERY VIDEOS
=================================================================

For videos in the Gallery section (the "gallery" list in js/data.js):

  {
    category: "video",
    image:    "gallery-08.jpg",                       ← thumbnail (file in assets/images/gallery/)
    alt:      "Description of this video",
    link:     "https://www.youtube.com/embed/YOUR_ID", ← any YouTube link works
  },

When a visitor clicks the video thumbnail in the gallery,
the video opens in a popup and plays directly on the page.

=================================================================
QUICK REFERENCE
=================================================================

YouTube embed:   https://www.youtube.com/embed/VIDEO_ID
Facebook embed:  https://www.facebook.com/plugins/video.php?href=...

Replace VIDEO_ID with the actual ID from your video URL.
Example: if your YouTube URL is
         https://www.youtube.com/watch?v=abc123XYZ
         then your embed URL is
         https://www.youtube.com/embed/abc123XYZ

=================================================================
