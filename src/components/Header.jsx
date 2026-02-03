import { logout, isLoggedIn, getUserFromToken } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
	const navigate = useNavigate();
	const user = getUserFromToken();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setMenuOpen(false);
		navigate("/");
	};

	return (
		<header className="w-full bg-[#222] border-b border-white/10 relative z-50">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
				{/* LEFT */}
				<Link to="/" className="flex items-center gap-2 group">
					<div className="w-2 h-8 bg-cyan-400 group-hover:bg-cyan-300 transition-all" />
					<h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">
						Race<span className="text-cyan-400">Predictor</span>
					</h1>
				</Link>

				{/* DESKTOP NAV */}
				<nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-widest">
					<Link
						to="/dashboard"
						className="text-white/70 hover:text-cyan-400 transition"
					>
						Dashboard
					</Link>
					<Link
						to="/races"
						className="text-white/70 hover:text-cyan-400 transition"
					>
						Races
					</Link>
					<Link
						to="/my-predictions"
						className="text-white/70 hover:text-cyan-400 transition"
					>
						My Predictions
					</Link>
				</nav>

				{/* DESKTOP AUTH */}
				<div className="hidden md:flex items-center gap-4">
					{isLoggedIn() ? (
						<div className="flex items-center gap-4">
							<div className="flex flex-col text-right">
								<span className="text-white font-medium">{user?.username}</span>
							</div>

							<button
								onClick={handleLogout}
								className="px-4 py-2 text-sm border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded"
							>
								Logout
							</button>
						</div>
					) : (
						<div className="flex items-center gap-3">
							<Link
								to="/login"
								className="text-white/70 hover:text-cyan-400 transition"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="px-4 py-2 text-sm border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded"
							>
								Sign up
							</Link>
						</div>
					)}
				</div>

				{/* MOBILE BUTTON */}
				<button
					className="md:hidden text-white text-2xl cursor-pointer"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? "✕" : "☰"}
				</button>
			</div>

			{/* MOBILE MENU */}
			<div
				className={`md:hidden bg-[#1a1a1a] border-t border-white/10 overflow-hidden transition-all duration-500 ease-out
	${
		menuOpen
			? "max-h-[500px] opacity-100 translate-y-0"
			: "max-h-0 opacity-0 -translate-y-2"
	}
	`}
			>
				<div className="px-6 py-4 space-y-4">
					<nav className="flex flex-col gap-3 text-sm uppercase tracking-widest">
						<Link
							onClick={() => setMenuOpen(false)}
							to="/dashboard"
							className="text-white/80 hover:text-cyan-400"
						>
							Dashboard
						</Link>
						<Link
							onClick={() => setMenuOpen(false)}
							to="/races"
							className="text-white/80 hover:text-cyan-400"
						>
							Races
						</Link>
						<Link
							onClick={() => setMenuOpen(false)}
							to="/my-predictions"
							className="text-white/80 hover:text-cyan-400"
						>
							My Predictions
						</Link>
					</nav>

					<div className="border-t border-white/10 pt-4">
						{isLoggedIn() ? (
							<div className="flex flex-col items-center gap-3">
								<div className="text-white">
									<div className="font-medium ">{user?.username}</div>
								</div>

								<button
									onClick={handleLogout}
									className="w-full px-4 py-2 text-sm border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded"
								>
									Logout
								</button>
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<Link
									onClick={() => setMenuOpen(false)}
									to="/login"
									className="text-white/80 hover:text-cyan-400"
								>
									Login
								</Link>
								<Link
									onClick={() => setMenuOpen(false)}
									to="/register"
									className="px-4 py-2 text-sm border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded text-center"
								>
									Sign up
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
