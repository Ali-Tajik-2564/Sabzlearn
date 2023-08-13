/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module utils/dom/getelementsintersectionrect
 */
import Rect from './rect';
/**
 * Calculates the intersection `Rect` of a given set of elements (and/or a `document`).
 * Also, takes into account the viewport top offset configuration.
 *
 * @internal
 * @param elements
 * @param viewportTopOffset
 */
export default function getElementsIntersectionRect(elements: Array<HTMLElement | Document>, viewportTopOffset?: number): Rect | null;
