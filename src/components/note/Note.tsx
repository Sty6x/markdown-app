import { useParams, Outlet, useNavigate } from "react-router-dom";
import Editor from "../editor/Editor";
import Preview from "../preview/Preview";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import { useRef, useState } from "react";
import "./note.scss";
import { connectFirestoreEmulator } from "firebase/firestore";
const Note = () => {
	const { noteID } = useParams();
	const navigate = useNavigate();
	const [editorWidth, setEditorWidth] = useState<number>(500);
	const [currentPanePos, setCurrentPanePos] = useState<number>();
	const [isResizing, setResizing] = useState<boolean>(false);
	const editorRef = useRef();
	const paneRef = useRef();
	const [input, setInput] = useState<string>(`
This is a title
# Header 1
## jsCode snippet and some shit that i dont understand
		This is a code snippet
>Line break  
>Another Line Break

### This is a list
1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3
	
\`\`\`js
const searchQuery = useCallback(
	(input: string, noteList: Array<{ title: string }>) => {
			const filterNotes = noteList.filter((note) => {
				return note.title.includes(input) && note;
			});
			console.log(filterNotes);
			if (input !== "") {
				return setNoteLists(filterNotes);
			}
			return setNoteLists(originalNotes);
		},
		[]
	);
\`\`\`\
	`);

	function handleEditorOnChange(value: string): void {
		const editorMarkdownValue: string = value;
		setInput(editorMarkdownValue);
	}

	function getPaneAndMousePosition(e: React.MouseEvent): void {
		setResizing(true);

		// we can get the initial pane position on click
		// since we can't actually get position of pane we can use mouse
		// position to locate where the pane is
		const mouseX = e.clientX;
		// get percentage of pane
		// from current mouse position (which is pane) relative to origin point
		// of viewport width or X
		const calculatePanePos = (mouseX / window.innerWidth) * 100;

		// converting to pixel
		// say pane is  x% of total width
		// to x is x-px of total width
		// purpose of this calculation is so that we can compare
		// if mouse x is greater or less than position of pane
		// so that we can increment or decrement width of editor by pixels
		setCurrentPanePos((calculatePanePos / 100) * window.innerWidth);
	}

	function resizePane(e: React.MouseEvent): void {
		const mouseX = e.clientX;
		// calculate again  and instead of using the current position of the mouse
		// use the initial position that was set on click from getPaneAndMousePosition
		const calculatePanePos = (currentPanePos / window.innerWidth) * 100;

		// set the new calculate position of pane
		// no need to use state since we can still get the updated currentPane state
		// from calculatePanePos
		setCurrentPanePos((calculatePanePos / 100) * window.innerWidth);
		console.log({ x: mouseX });
		console.log({ pane: currentPanePos });
		// set editors width to mouseX's position
		if (mouseX < currentPanePos) {
			console.log("decrement");
			setEditorWidth((prev) => prev - 50);
		}
		if (mouseX > currentPanePos) {
			console.log("increment");
			setEditorWidth((prev) => prev + 50);
		}
	}

	return (
		<section
			id="note"
			className="flex flex-1 bg-vn-dshade-black relative text-vn-white w-full "
			onMouseMove={resizePane}
		>
			<Editor
				editorRef={editorRef}
				newWidth={editorWidth}
				input={input}
				onChange={handleEditorOnChange}
			/>
			<div
				ref={paneRef}
				onMouseDown={getPaneAndMousePosition}
				onMouseUp={() => {
					setResizing(false);
				}}
				style={{ width: "6px" }}
				className=" h-full hover:bg-vn-outline-black transition-all active:bg-vn-dshade-white duration-150 ease-in-out select-none cursor-ew-resize  bg-vn-black box-content"
			/>
			<Preview markdownInput={input} />
		</section>
	);
};

export default Note;
