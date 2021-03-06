'use babel';

export default class FoldingPreview {
    constructor(textEditor, foldingMarker, previewData, class_) {
        this.foldingMarker = foldingMarker;
        this.textEditor = textEditor;
        this._decorateParams = {
            type: 'overlay',
            item: this._makeDiv(previewData),
            class: class_,
            position: 'tail',
            avoidOverflow: false
        };
        this._decoration = null;
        this._create();
        this._isHidden = false;
    }

    destroy() { this._decoration.destroy(); }

    updateClass(class_) {
        this.destroy();
        this._decorateParams['class'] = class_;
        this._create();
    }

    hide() {
        this.destroy();
        this._isHidden = true;
    }

    show() {
        this._create();
        this._isHidden = false;
    }

    isHidden() { return this._isHidden; }

    _makeDiv(previewData) {
        const div = document.createElement('div');
        if(previewData.html !== undefined && previewData.html !== null) {
            div.appendChild(previewData.html);
        } else {
            div.innerText = previewData.text;
        }
        div.addEventListener('click', (e) => {
            this.textEditor.setCursorBufferPosition(this.foldingMarker.getBufferRange().start);
        });
        return div;
    }

    _create() {
        this._decoration = this.textEditor.decorateMarker(
            this.foldingMarker.innerMarker, this._decorateParams);
    }
}
