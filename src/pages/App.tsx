import Navbar from "@/components/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NoteItem from "@/components/NoteItem";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import SidebarActions from "@/components/SidebarActions";
import Sidebar from "@/components/sidebar/Sidebar";
import { uid } from "uid";
import { INote } from "@/utils/types/Note";
import SideMenu from "@/components/SideMenu";
import NavbarActions from "@/components/navbar-actions/NavbarActions";
import { signOut } from "firebase/auth";
import { FirebaseContext } from "@/App";

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
	const { auth, db } = useContext(FirebaseContext);
	const noteIDRef = useRef(undefined);
	const [searchInput, setSearchInput] = useState<string>("");
	const sideBarRef = useRef<HTMLDivElement>();
	const [notes, setNotes] = useState<INote[]>([
		{
			id: uid(16),
			contents: `# Header
This is a place holder header for vimnotes note

### Take your Markdown skills to the next level.
Learn Markdown in 60 pages. Designed for both novices and experts, The Markdown Guide book is a comprehensive 
reference that has everything you need to get started and master Markdown syntax.
## Header 2
Do not pay him
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
		{
			id: uid(16),
			contents: `# React Routing

### Client Side Routing 
> Internal handling of routes inside the JS file that is rendered to the client. client side routing helps build single page applications without having to refresh the page when user navigates between pages within the application


### React router uses dynamic routing
Meaning it takes place as the app is rendering instead of relying on a third party or server to render the page and fetch it from there

<Route/> Those are our routes with a path, which EQUALS the url path, and a COMPONENT that should be rendered when we navigate to this url. a component is specified that should be rendered in that path.

<BrowserRouter> uses the History API to keep your UI in sync with the URL

<Routes> renders the FIRST child Route that matches the location, the Routes Component is going to look tthrough all your Routes(Route children) and check their path. The firest Route, whose path matches the url EXACTLY will be rendered.

> Dynamic Segement is a placeholder that are parsed and providedd by various apis
":" means its a dynamic segment.
/shop/:id
any value that is provided in the Dynamic Segment will be routed to a specific Component 

if <Route to="/shop/:id" component={Render This Component} />,
anytime a Link component specifies a path to /shop/{Some ID from an API}, then the Route that specifies that dynamic segment will render the component that matches ANY value that has the same path as the shop Route

Link Having Access to a prop called Match
Shop renders list of items that has any uniqueIDs and by clicking on any of the link will routed to a specific component that is linked with the spceific URL using the object's ID the itemDetial component with the dynamic segment that is routed to us using Link Component will have access the the Link's parameters including the url `,
		},
		{
			id: uid(16),
			contents: `# CRUD and MVC

CRUD stands for, Create, Read, Update and Delete these are four basic functions for a database driven app, if building a crud interface that means users should be able to do these 4 things to items in the database 

CRUD operations roughly correlates to HTTP methods   
1. app.post() = Create
2. app.get() = Read
3. app.put() = Update
4. app.delete() = Delete


### MVC ( Model View Controller) 
refers to the ARCHITECTURE of our code, it is a way for us to ORGANIZE our Application by separating all of the actions into 3 main components: Models, Views and Controllers.

#### Models 
are the basic building blocks of your database. So for every entry in your DB (books, authors, etc. in our Library Project), you’ll create a model that holds the details of that entry. Models define the types of information that get used by your views and controllers.

#### Views
are, of course, the component that generates the UI for your application. In our case, we’ve selected a templating engine that uses data supplied by a controller to display the desired information.

#### Controllers 
are the components that decide what view to display and what information is going to be put into it.


 MVC Architecture  
           **Model**: is how the data or information is structured  
           **View**: what will be displayed to the clients  
           **Controller**: handles what data is to be retrieved from our model and what the client wants to "view" depending on the request of the client
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
			<button
				className="absolute z-40"
				onClick={() => {
					signOut(auth);
				}}
			>
				sign out
			</button>
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
