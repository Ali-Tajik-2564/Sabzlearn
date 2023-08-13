/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module clipboard/dragdropblocktoolbar
 */
/* istanbul ignore file -- @preserve */
import { Plugin } from '@ckeditor/ckeditor5-core';
import { env, global, DomEmitterMixin } from '@ckeditor/ckeditor5-utils';
import ClipboardObserver from './clipboardobserver';
/**
 * Integration of an experimental block Drag and drop support with the block toolbar.
 *
 * @internal
 */
export default class DragDropBlockToolbar extends Plugin {
    constructor() {
        super(...arguments);
        /**
         * Whether current dragging is started by block toolbar button dragging.
         */
        this._isBlockDragging = false;
        /**
         * DOM Emitter.
         */
        this._domEmitter = new (DomEmitterMixin())();
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'DragDropBlockToolbar';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        this.listenTo(editor, 'change:isReadOnly', (evt, name, isReadOnly) => {
            if (isReadOnly) {
                this.forceDisabled('readOnlyMode');
                this._isBlockDragging = false;
            }
            else {
                this.clearForceDisabled('readOnlyMode');
            }
        });
        if (env.isAndroid) {
            this.forceDisabled('noAndroidSupport');
        }
        if (editor.plugins.has('BlockToolbar')) {
            const blockToolbar = editor.plugins.get('BlockToolbar');
            const element = blockToolbar.buttonView.element;
            element.setAttribute('draggable', 'true');
            this._domEmitter.listenTo(element, 'dragstart', (evt, data) => this._handleBlockDragStart(data));
            this._domEmitter.listenTo(global.document, 'dragover', (evt, data) => this._handleBlockDragging(data));
            this._domEmitter.listenTo(global.document, 'drop', (evt, data) => this._handleBlockDragging(data));
            this._domEmitter.listenTo(global.document, 'dragend', () => this._handleBlockDragEnd(), { useCapture: true });
        }
    }
    /**
     * @inheritDoc
     */
    destroy() {
        this._domEmitter.stopListening();
        return super.destroy();
    }
    /**
     * The `dragstart` event handler.
     */
    _handleBlockDragStart(domEvent) {
        if (!this.isEnabled) {
            return;
        }
        const model = this.editor.model;
        const selection = model.document.selection;
        const blocks = Array.from(selection.getSelectedBlocks());
        const draggedRange = model.createRange(model.createPositionBefore(blocks[0]), model.createPositionAfter(blocks[blocks.length - 1]));
        model.change(writer => writer.setSelection(draggedRange));
        this._isBlockDragging = true;
        this.editor.editing.view.getObserver(ClipboardObserver).onDomEvent(domEvent);
    }
    /**
     * The `dragover` and `drop` event handler.
     */
    _handleBlockDragging(domEvent) {
        if (!this.isEnabled || !this._isBlockDragging) {
            return;
        }
        const clientX = domEvent.clientX + 100;
        const clientY = domEvent.clientY;
        const target = document.elementFromPoint(clientX, clientY);
        if (!target || !target.closest('.ck-editor__editable')) {
            return;
        }
        this.editor.editing.view.getObserver(ClipboardObserver).onDomEvent({
            ...domEvent,
            type: domEvent.type,
            dataTransfer: domEvent.dataTransfer,
            target,
            clientX,
            clientY,
            preventDefault: () => domEvent.preventDefault(),
            stopPropagation: () => domEvent.stopPropagation()
        });
    }
    /**
     * The `dragend` event handler.
     */
    _handleBlockDragEnd() {
        this._isBlockDragging = false;
    }
}
