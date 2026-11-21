# Cleveland 2016 championship archive

A static page that organizes Jason's 2016 Cavs championship media: The King Returns hype video, full broadcasts of Finals games 1 to 7, Game 7 and the call, championship night, fan reactions, the homecoming, the parade and rally, radio, shows and the ring ceremony.

Site: https://jseemann.github.io/cavs-2016-championship/

## Where the media lives

The media stays in Google. This repo holds only the page, a list of titles and file IDs (`data.js`), and small thumbnails (`thumbs/`).

| Content | Source | How it plays |
| --- | --- | --- |
| The King Returns and Finals games 1 to 7 | Google Photos album "2016 NBA Finals - Full Games" | Opens in Google Photos in a new tab. Photos can't be embedded. |
| Everything else (clips, broadcasts, photos, radio, PDF) | Google Drive folder "Cavs Championship Stuff" | Plays on the page in Drive's embedded viewer |

## Sharing

Drive and Photos have separate permissions. A person needs both to see everything.

1. **Drive:** share the "Cavs Championship Stuff" folder with the person's Google account as a Viewer.
2. **Google Photos:** open the "2016 NBA Finals - Full Games" album, click Share, and add the same Google account. Sharing the Drive folder does not give access to the album.
3. Send them the site link. They need to be signed into that Google account in the same browser.

Without access, Drive items show a "You need access" screen and Photos items won't open. The page itself, titles and thumbnails, is public to anyone with the link.

Some browsers block the cookies Drive's embedded player needs (Safari can). In that case, the "Open in Drive" link in the viewer still works.

## Updating

`data.js` is generated from the rename manifest. To add a file:

- **Drive:** put it in the right Drive folder, add an entry to `data.js` with its Drive file ID, and optionally add a thumbnail named `<file id>.jpg` to `thumbs/`.
- **Google Photos:** add an entry with the Photos item ID and a `u` field holding the item's full album URL. Entries with `u` open in a new tab instead of the embedded viewer.
