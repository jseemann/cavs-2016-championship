# Cleveland 2016 championship archive

A static page that organizes Jason's Google Drive folder of 2016 Cavs championship media: Game 7, championship night, fan reactions, the homecoming, the parade and rally, radio, shows and the ring ceremony.

The media stays in Google Drive. This repo holds only the page, a list of titles and Drive file IDs (`data.js`), and small thumbnails (`thumbs/`). Videos, photos, audio and the PDF play through Drive's embedded viewer, so a visitor sees them only if the Drive folder is shared with their Google account and they're signed in.

## Sharing

1. In Google Drive, share the "Cavs Championship Stuff" folder with the person's Google account as a Viewer.
2. Send them the GitHub Pages link.

## Updating

`data.js` is generated from the rename manifest. To add a file, put it in the right Drive folder, add an entry with its Drive file ID to `data.js`, and add a thumbnail named `<file id>.jpg` to `thumbs/` if you want a preview image.
