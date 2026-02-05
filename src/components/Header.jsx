import { logout, isLoggedIn, getUserFromToken } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { teamThemes } from "../theme/teams";

export default function Header() {
	const navigate = useNavigate();
	const user = getUserFromToken();
	const [menuOpen, setMenuOpen] = useState(false);

	const team = user?.team || "default";
	const theme = teamThemes[team] || teamThemes.default;

	const handleLogout = () => {
		logout();
		setMenuOpen(false);
		navigate("/");
	};

	const navHoverEnter = (e) => {
		e.target.style.color = theme.primary;
	};

	const navHoverLeave = (e) => {
		e.target.style.color = "rgba(255,255,255,0.7)";
	};

	const buttonHoverEnter = (e) => {
		e.target.style.backgroundColor = theme.primary;
		e.target.style.color = "#000";
		e.target.style.boxShadow = `0 0 12px ${theme.glow}`;
	};

	const buttonHoverLeave = (e) => {
		e.target.style.backgroundColor = "transparent";
		e.target.style.color = theme.primary;
		e.target.style.boxShadow = "none";
	};

	return (
		<header className="w-full bg-[#222]  relative z-50">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
				{/* LEFT */}
				<Link to="/" className="flex items-center gap-2 group">
					<div
						className="w-2 h-8 transition-all"
						style={{
							backgroundColor: theme.primary,
							boxShadow: `0 0 10px ${theme.glow}`,
						}}
					/>
					<h1 className="text-xl md:text-2xl font-bold tracking-wide text-white ">
						Race{" "}
						<span
							style={{
								color: theme.primary,
								textShadow: `0 0 8px ${theme.glow}`,
							}}
						>
							Predictor
						</span>
					</h1>
				</Link>

				{/* DESKTOP NAV */}
				<nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-widest">
					<Link
						to="/dashboard"
						className="text-white/70 transition duration-200"
						onMouseEnter={navHoverEnter}
						onMouseLeave={navHoverLeave}
					>
						Dashboard
					</Link>
					<Link
						to="/races"
						className="text-white/70 transition duration-200"
						onMouseEnter={navHoverEnter}
						onMouseLeave={navHoverLeave}
					>
						Races
					</Link>
					<Link
						to="/my-predictions"
						className="text-white/70 transition duration-200"
						onMouseEnter={navHoverEnter}
						onMouseLeave={navHoverLeave}
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
								className="px-4 py-2 text-sm transition-all rounded cursor-pointer"
								style={{
									border: `1px solid ${theme.primary}`,
									color: theme.primary,
								}}
								onMouseEnter={buttonHoverEnter}
								onMouseLeave={buttonHoverLeave}
							>
								Logout
							</button>
						</div>
					) : (
						<div className="flex items-center gap-3">
							<Link
								to="/login"
								style={{ color: theme.primary }}
								className="transition hover:opacity-80"
							>
								Login
							</Link>

							<Link
								to="/register"
								style={{
									borderColor: theme.primary,
									color: theme.primary,
									boxShadow: `0 0 12px ${theme.glow}`,
								}}
								className="px-4 py-2 text-sm border transition-all duration-300 rounded hover:text-black"
								onMouseEnter={buttonHoverEnter}
								onMouseLeave={buttonHoverLeave}
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
							className="text-white/70 transition duration-200"
							onMouseEnter={navHoverEnter}
							onMouseLeave={(e) =>
								(e.target.style.color = "rgba(255,255,255,0.7)")
							}
						>
							Dashboard
						</Link>
						<Link
							onClick={() => setMenuOpen(false)}
							to="/races"
							className="text-white/70 transition duration-200"
							onMouseEnter={navHoverEnter}
							onMouseLeave={navHoverLeave}
						>
							Races
						</Link>
						<Link
							onClick={() => setMenuOpen(false)}
							to="/my-predictions"
							className="text-white/70 transition duration-200"
							onMouseEnter={(e) => (e.target.style.color = theme.primary)}
							onMouseLeave={navHoverLeave}
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
									className="w-full px-4 py-2 text-sm border transition-all duration-300 rounded cursor-pointer"
									style={{
										border: `1px solid ${theme.primary}`,
										color: theme.primary,
									}}
									onMouseEnter={buttonHoverEnter}
									onMouseLeave={buttonHoverLeave}
								>
									Logout
								</button>
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<Link
									onClick={() => setMenuOpen(false)}
									to="/login"
									style={{ color: theme.primary }}
									className="transition hover:opacity-80 text-center"
								>
									Login
								</Link>

								<Link
									onClick={() => setMenuOpen(false)}
									to="/register"
									style={{
										borderColor: theme.primary,
										color: theme.primary,
										boxShadow: `0 0 12px ${theme.glow}`,
									}}
									className="px-4 py-2 text-sm border transition-all duration-300 rounded text-center hover:text-black"
									onMouseEnter={buttonHoverEnter}
									onMouseLeave={buttonHoverLeave}
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
