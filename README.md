# rofi-notes-org

A simple [rofi-script](https://www.mankier.com/5/rofi-script) that helps
you catch and access notes with
[rofi](https://github.com/davatorium/rofi) and store them in a simple
Emacs [Org-mode](https://orgmode.org/) (or plain text) file.
![](./usage_guide.gif)

## Installation

Use [npm](https://www.npmjs.com/package/rofi-notes-org) to install
`rofi-notes-org` globally.

``` bash
$ npm install -g rofi-notes-org
```

Needless to say, you have to have
[rofi](https://github.com/davatorium/rofi) installed as well.

## Initial configuration

rofi-notes-org needs a config file located at
`~/.config/rofi/rofi-notes-org.yaml` with the following properties:

``` yaml
notes-file: "~/.notes_org"
# Path to the text file where the data (notes) will be stored.
# WARNING: this file has to be already created.

plain-text-format: false
# If set to true the specified `notes-file` will be in
# plain text format rather than using Emacs Org-mode format.
```

At this point calling the script from the terminal should execute
without errors.

``` bash
$ rofi-notes-org
```

## Usage

To use this rofi script, call it like this:

``` bash
$ rofi -show notes -modi "notes:rofi-notes-org"
```

You may also want to use it in a combination with other modi like this:

``` bash
$ rofi -show notes -modi "notes:rofi-notes-org,run"
```

You may also want to bind it to a hotkey in your window manager or
desktop environment of choice.

## License

[MIT](https://choosealicense.com/licenses/mit/)
