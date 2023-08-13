/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module indent/indentblockcommand
 */
import { Command } from 'ckeditor5/src/core';
import { first } from 'ckeditor5/src/utils';
/**
 * The indent block command.
 *
 * The command is registered by the {@link module:indent/indentblock~IndentBlock} as `'indentBlock'` for indenting blocks and
 * `'outdentBlock'` for outdenting blocks.
 *
 * To increase block indentation at the current selection, execute the command:
 *
 * ```ts
 * editor.execute( 'indentBlock' );
 * ```
 *
 * To decrease block indentation at the current selection, execute the command:
 *
 * ```ts
 * editor.execute( 'outdentBlock' );
 * ```
 */
export default class IndentBlockCommand extends Command {
    /**
     * Creates an instance of the command.
     */
    constructor(editor, indentBehavior) {
        super(editor);
        this._indentBehavior = indentBehavior;
    }
    /**
     * @inheritDoc
     */
    refresh() {
        // Check whether any of the position's ancestors is a list item.
        const editor = this.editor;
        const model = editor.model;
        const block = first(model.document.selection.getSelectedBlocks());
        if (!block || !model.schema.checkAttribute(block, 'blockIndent')) {
            this.isEnabled = false;
            return;
        }
        this.isEnabled = this._indentBehavior.checkEnabled(block.getAttribute('blockIndent'));
    }
    /**
     * @inheritDoc
     */
    execute() {
        const model = this.editor.model;
        const blocksToChange = getBlocksToChange(model);
        model.change(writer => {
            for (const block of blocksToChange) {
                const currentIndent = block.getAttribute('blockIndent');
                const nextIndent = this._indentBehavior.getNextIndent(currentIndent);
                if (nextIndent) {
                    writer.setAttribute('blockIndent', nextIndent, block);
                }
                else {
                    writer.removeAttribute('blockIndent', block);
                }
            }
        });
    }
}
/**
 * Returns blocks from selection that should have blockIndent selection set.
 */
function getBlocksToChange(model) {
    const selection = model.document.selection;
    const schema = model.schema;
    const blocksInSelection = Array.from(selection.getSelectedBlocks());
    return blocksInSelection.filter(block => schema.checkAttribute(block, 'blockIndent'));
}
