# Selfie Transfer

This utility is meant to be used in combination with a Siri Shortcut.
It allows you to take a selfie without any input needed by the user.
Siri Shortcuts already has an option for taking a photo,
but unfortunately it takes the picture too soon on some devices.
As a result, the camera hasn't had a chance to warm up yet and the picture turns out very dark.
This site allows you to set a delay before the picture is taken.

## Usage

1. Visit `https://selfie-transfer.deno.dev/?id=<enter your id here>` on your phone.
   You can enter any id, but each id only allows a single submission.
   So when using it with the shortcut you should generate a random id every time you run it.
2. When prompted, Allow Camera access.
3. Tap the 'aA' icon in the address bar.
4. Tap 'Website Settings'
5. Tap 'Camera' and choose 'Allow'

The site should now be set up and be able to take pictures without a permission prompt.

An example on how to use this with Siri Shortcuts [can be found here](https://www.icloud.com/shortcuts/11c73039079f460bb8326ec8b571a2a1).

## Usage without Siri Shortcuts

This tool is mostly meant for use with Siri Shortcuts, but it might have other use cases as well.
There are two main endpoints: `/?id=<id>` and `/getResult?id=<id>`.
The second endpoint will stay pending until a picture has been taken by the first endpoint.
A picture can only be taken once for a specified id, if you want to take multiple pictures,
you'll have to use separate ids.

Optional parameters for the first endpoint:

- `delay` - Wait with taking the picture until the specified amount of milliseconds has been passed.
  For example `https://selfie-transfer.deno.dev/?id=1234&delay=1000` to wait one second before taking the picture.
- `text` - Show text on screen while the picture is being taken.
  For example `https://selfie-transfer.deno.dev/?id=1234&text=smile`.
