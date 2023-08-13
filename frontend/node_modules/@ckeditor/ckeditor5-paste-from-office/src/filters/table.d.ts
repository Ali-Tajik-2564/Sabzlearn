/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module paste-from-office/filters/table
 */
import { type ViewDocumentFragment } from 'ckeditor5/src/engine';
/**
 * Set alignment for table pasted from MS Word.
 *
 * @param documentFragment The view structure to be transformed.
 */
export declare function setTableAlignment(documentFragment: ViewDocumentFragment): void;
