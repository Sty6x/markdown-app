import Navbar from "@/components/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NoteItem from "@/components/NoteItem";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import SidebarActions from "@/components/SidebarActions";
import Sidebar from "@/components/sidebar/Sidebar";
import { uid } from "uid";
import { INote } from "@/utils/Note";
import SideMenu from "@/components/SideMenu";

export interface IContextType {
	notes: Array<INote>;
	setNotes: (prev: Array<INote>) => void;
	noteIDRef: { current: undefined | string };
}

export const NoteContext = createContext<IContextType>(
	null as unknown as IContextType
);
const App = () => {
	const navigate = useNavigate();
	const noteIDRef = useRef(undefined);
	const [searchInput, setSearchInput] = useState<string>("");
	const sideBarRef = useRef<HTMLDivElement>();
	const [notes, setNotes] = useState<INote[]>([
		{
			id: uid(16),
			contents: `# Header
This is a place holder header for vimnotes note

## Header 2
Do not pay him
### Header 3
#### Header 4

[link to somewheere]()  
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

> Break Here

Here's a sentence with a footnote. [^1]  
Here's a sentence with a footnote. [^2]
[^1]: This is the footnote.   
[^2]: This is the footnote.   

~~The world is flat.~~  
I need to highlight these ==very important words==.  
H~2~O  
X^2^
`,
		},
	]);
	// created searchedNotes so that when searching for notes search query function
	// so that we don't directly set the original notes
	const [searchedNotes, setSearchedNotes] = useState(notes);

	function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>): void {
		console.log(e.target.value);
		setSearchInput(e.target.value);
	}

	const searchQuery = useCallback(
		(input: string, notesArr: Array<INote>) => {
			if (input !== "") {
				// on each state changes the application rerenders so that it keeps
				// the UI in sync, notes in filter notes is referencing
				// the previous state before the re-render or state changes happened
				// so on each search query calls the state of notes still persist
				// even after rerendering and filtering its state
				const filterNotes = notesArr.filter((note) =>
					note.contents.includes(input)
				);
				return setSearchedNotes(filterNotes);
			}
			return setSearchedNotes(searchedNotes);
		},
		[notes]
	);

	async function addNote(): Promise<void> {
		const newID = uid(16).toString();
		const newNote: INote = {
			id: newID,
			contents: "",
		};
		setNotes((prev) => [newNote, ...prev]);
		console.log(newNote);
	}

	async function deleteNote(e: React.MouseEvent): Promise<void> {
		e.preventDefault();
		console.log(noteIDRef);
		// const filterCurrentNote = notes.filter(
		// 	(note) => note.id !== noteIDRef.current
		// );
		// setNotes(filterCurrentNote);
	}

	async function redirectToExistingNotes(): Promise<void> {
		if (notes.length !== 0) {
			return navigate(`/app/${notes[0].id}`);
		}
		return navigate("/app/empty-notes");
	}

	useEffect(() => {
		searchQuery(searchInput, notes);
	}, [searchInput]);

	// hasnt searched notes updated yet to display note items when notes is updated
	useEffect(() => {
		setSearchedNotes(notes);
	}, [notes]);

	useEffect(() => {
		redirectToExistingNotes();
	}, []);

	return (
		<main
			id="app-page"
			className=" h-screen w-screen flex flex-col relative "
		>
			<Navbar deleteNote={deleteNote} />
			<section id="content-section" className="flex-1 flex h-[0%]">
				<SideMenu sideBarRef={sideBarRef} />
				<Sidebar sideBarRef={sideBarRef}>
					<SidebarActions
						searchInput={searchInput}
						handleInput={handleSearchInput}
						addNote={addNote}
					/>
					<ul id="notes-list" className="h-full w-[384px] ">
						{notes.length !== 0 ? (
							searchedNotes.map((note) => {
								return <NoteItem key={note.id} note={note} />;
							})
						) : (
							<p className="text-center mt-6 text-sm text-vn-dshade-white">
								You don't have any notes, click on the '+' icon.{" "}
							</p>
						)}
					</ul>
				</Sidebar>
				<NoteContext.Provider value={{ notes, setNotes, noteIDRef }}>
					<Outlet />
				</NoteContext.Provider>
			</section>
		</main>
	);
};

export default App;
