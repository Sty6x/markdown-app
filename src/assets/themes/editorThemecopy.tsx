import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
export const editorAppTheme = createTheme({
	dark: "light",
	settings: {
		background: "#2d2f33",
		foreground: "#d9d9d9",
		caret: "#AEAFAD",
		selection: "#878A8C50",
		selectionMatch: "#878A8C40",
		gutterBackground: "#2d2f33",
		gutterForeground: "#878A8C80",
		gutterBorder: "#6B7FF200",
		gutterActiveForeground: "#000000",
		lineHighlight: "#6B7FF2",
	},
	styles: [
		{ tag: t.comment, color: "#787b80" },
		{ tag: t.labelName, color: "#F2C46D" },
		{ tag: t.name, color: "#902727" },
		{ tag: t.definition(t.typeName), color: "#d9d9d9" },
		{ tag: t.typeName, color: "#d9d9d9" },
		{ tag: t.standard(t.typeName), color: "#d9d9d9" },
		{ tag: t.tagName, color: "#d9d9d9" },
		{ tag: t.variableName, color: "#d9d9d9" },
		{ tag: t.definition(t.variableName), color: "#d9d9d9" },
		{ tag: t.function(t.variableName), color: "#d9d9d9" },
		{ tag: t.propertyName, color: "#d9d9d9" },
		{ tag: t.function(t.propertyName), color: "#d9d9d9" },
		{ tag: t.definition(t.propertyName), color: "#d9d9d9" },
		{ tag: t.special(t.propertyName), color: "#000000" },
		{ tag: t.attributeName, color: "#d9d9d9" },
		{ tag: t.className, color: "#d9d9d9" },
		{ tag: t.string, color: "#d9d9d9" },
		{ tag: t.docString, color: "#d9d9d9" },
		{ tag: t.attributeValue, color: "#d9d9d9" },
		{ tag: t.number, color: "#d9d9d9" },
		{ tag: t.integer, color: "#d9d9d9" },
		{ tag: t.bool, color: "#d9d9d9" },
		{ tag: t.keyword, color: "#d9d9d9" },
		{ tag: t.definitionKeyword, color: "#d9d9d9" },
	],
});
