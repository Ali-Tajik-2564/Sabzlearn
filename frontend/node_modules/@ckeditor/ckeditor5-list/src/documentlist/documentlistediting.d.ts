/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/documentlist/documentlistediting
 */
import { Plugin } from 'ckeditor5/src/core';
import type { DowncastWriter, Element, ViewElement, Writer } from 'ckeditor5/src/engine';
import { Delete } from 'ckeditor5/src/typing';
import { Enter } from 'ckeditor5/src/enter';
import DocumentListUtils from './documentlistutils';
import { ListBlocksIterable } from './utils/listwalker';
import '../../theme/documentlist.css';
import '../../theme/list.css';
/**
 * Map of model attributes applicable to list blocks.
 */
export interface ListItemAttributesMap {
    listType?: 'numbered' | 'bulleted';
    listIndent?: number;
    listItemId?: string;
}
/**
 * The editing part of the document-list feature. It handles creating, editing and removing lists and list items.
 */
export default class DocumentListEditing extends Plugin {
    /**
     * The list of registered downcast strategies.
     */
    private readonly _downcastStrategies;
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentListEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Enter, typeof Delete, typeof DocumentListUtils];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * Registers a downcast strategy.
     *
     * **Note**: Strategies must be registered in the `Plugin#init()` phase so that it can be applied
     * in the `DocumentListEditing#afterInit()`.
     *
     * @param strategy The downcast strategy to register.
     */
    registerDowncastStrategy(strategy: DowncastStrategy): void;
    /**
     * Returns list of model attribute names that should affect downcast conversion.
     */
    private _getListAttributeNames;
    /**
     * Attaches the listener to the {@link module:engine/view/document~Document#event:delete} event and handles backspace/delete
     * keys in and around document lists.
     */
    private _setupDeleteIntegration;
    /**
     * Attaches a listener to the {@link module:engine/view/document~Document#event:enter} event and handles enter key press
     * in document lists.
     */
    private _setupEnterIntegration;
    /**
     * Attaches a listener to the {@link module:engine/view/document~Document#event:tab} event and handles tab key and tab+shift keys
     * presses in document lists.
     */
    private _setupTabIntegration;
    /**
     * Registers the conversion helpers for the document-list feature.
     */
    private _setupConversion;
    /**
     * Registers model post-fixers.
     */
    private _setupModelPostFixing;
    /**
     * Integrates the feature with the clipboard via {@link module:engine/model/model~Model#insertContent} and
     * {@link module:engine/model/model~Model#getSelectedContent}.
     */
    private _setupClipboardIntegration;
}
/**
 * The downcast strategy.
 */
export interface DowncastStrategy {
    /**
     * The scope of the downcast (whether it applies to LI or OL/UL).
     */
    scope: 'list' | 'item';
    /**
     * The model attribute name.
     */
    attributeName: string;
    /**
     * Sets the property on the view element.
     */
    setAttributeOnDowncast(writer: DowncastWriter, value: unknown, element: ViewElement): void;
}
/**
 * Event fired on changes detected on the model list element to verify if the view representation of a list element
 * is representing those attributes.
 *
 * It allows triggering a re-wrapping of a list item.
 *
 * @internal
 * @eventName ~DocumentListEditing#postFixer
 * @param listHead The head element of a list.
 * @param writer The writer to do changes with.
 * @param seenIds The set of already known IDs.
 * @returns If a post-fixer made a change of the model tree, it should return `true`.
 */
export type DocumentListEditingPostFixerEvent = {
    name: 'postFixer';
    args: [
        {
            listNodes: ListBlocksIterable;
            listHead: Element;
            writer: Writer;
            seenIds: Set<string>;
        }
    ];
    return: boolean;
};
/**
 * Event fired on changes detected on the model list element to verify if the view representation of a list element
 * is representing those attributes.
 *
 * It allows triggering a re-wrapping of a list item.
 *
 * **Note**: For convenience this event is namespaced and could be captured as `checkAttributes:list` or `checkAttributes:item`.
 *
 * @internal
 * @eventName ~DocumentListEditing#checkAttributes
 */
export type DocumentListEditingCheckAttributesEvent = {
    name: 'checkAttributes' | 'checkAttributes:list' | 'checkAttributes:item';
    args: [
        {
            viewElement: ViewElement & {
                id?: string;
            };
            modelAttributes: ListItemAttributesMap;
        }
    ];
    return: boolean;
};
