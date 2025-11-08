


// // import React, { useEffect, useMemo, useState } from "react";
// // import dayjs from "dayjs";
// // import eventsData from "../data/events.json";
// // import HeaderBar from "./HeaderBar";

// // /**
// //  * Playful Modern MonthCalendar
// //  * - Logic (conflict detection, month navigation, modal) is exactly the same as your original.
// //  * - Visuals fully redesigned: mosaic day-cards with variable heights, tilted cards,
// //  *   rounded badges, neumorphic shadows, compact left column with month mini-card,
// //  *   and playful event chips.
// //  *
// //  * Drop into your project (Tailwind required).
// //  */

// // export default function MonthCalendar2() {
// //   const [currentMonth, setCurrentMonth] = useState(dayjs());
// //   const [events, setEvents] = useState([]);
// //   const [selectedDate, setSelectedDate] = useState(null);

// //   useEffect(() => {
// //     setEvents(
// //       eventsData.map((e) => ({
// //         ...e,
// //         colorIndex: Math.floor(Math.random() * 6),
// //       }))
// //     );
// //   }, []);

// //   const handlePrev = () => setCurrentMonth((m) => m.subtract(1, "month"));
// //   const handleNext = () => setCurrentMonth((m) => m.add(1, "month"));
// //   const handleToday = () => setCurrentMonth(dayjs());
// //   const today = dayjs();

// //   const parseTimeToMinutes = (timeStr) => {
// //     if (!timeStr) return 0;
// //     const [h, m] = timeStr.split(":").map((p) => parseInt(p, 10) || 0);
// //     return h * 60 + m;
// //   };

// //   const findConflicts = (eventList) => {
// //     const cloned = eventList.map((e) => ({ ...e, conflict: false }));
// //     for (let i = 0; i < cloned.length; i++) {
// //       for (let j = i + 1; j < cloned.length; j++) {
// //         const a = cloned[i];
// //         const b = cloned[j];
// //         if (a.date === b.date) {
// //           const startA = parseTimeToMinutes(a.time);
// //           const endA = startA + (parseInt(a.durationMinutes, 10) || 60);
// //           const startB = parseTimeToMinutes(b.time);
// //           const endB = startB + (parseInt(b.durationMinutes, 10) || 60);
// //           if (startA < endB && endA > startB) {
// //             cloned[i].conflict = true;
// //             cloned[j].conflict = true;
// //           }
// //         }
// //       }
// //     }
// //     return cloned;
// //   };

// //   const conflictedEvents = useMemo(() => findConflicts(events), [events]);

// //   // events for current month (same as original)
// //   const eventsThisMonth = useMemo(() => {
// //     return conflictedEvents.filter((e) => {
// //       const eventDate = dayjs(e.date);
// //       return (
// //         eventDate.month() === currentMonth.month() &&
// //         eventDate.year() === currentMonth.year()
// //       );
// //     });
// //   }, [conflictedEvents, currentMonth]);

// //   // only conflicting events of current month
// //   const conflictList = useMemo(() => {
// //     return eventsThisMonth.filter((e) => e.conflict);
// //   }, [eventsThisMonth]);

// //   const getEventsForDay = (date) =>
// //     eventsThisMonth.filter((e) => e.date === date.format("YYYY-MM-DD"));

// //   const handleDateClick = (date) => {
// //     const dayEvents = getEventsForDay(date);
// //     if (dayEvents.length > 0) setSelectedDate(date);
// //   };
// //   const closeModal = () => setSelectedDate(null);

// //   const startOfMonth = currentMonth.startOf("month");
// //   const endOfMonth = currentMonth.endOf("month");
// //   const startDate = startOfMonth.startOf("week");
// //   const endDate = endOfMonth.endOf("week");

// //   const days = [];
// //   let iter = startDate.clone();
// //   while (iter.isBefore(endDate, "day") || iter.isSame(endDate, "day")) {
// //     days.push(iter);
// //     iter = iter.add(1, "day");
// //   }

// //   const colorPalette = [
// //     // playful gradients / bg + text classes
// //     "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-100",
// //     "bg-gradient-to-r from-purple-50 to-pink-50 text-pink-800 border-pink-100",
// //     "bg-gradient-to-r from-emerald-50 to-teal-50 text-teal-800 border-teal-100",
// //     "bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-800 border-amber-100",
// //     "bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-800 border-cyan-100",
// //     "bg-gradient-to-r from-rose-50 to-fuchsia-50 text-fuchsia-800 border-fuchsia-100",
// //   ];

// //   // small helper to generate a slight rotation class per cell (playful)
// //   const tiltClasses = (idx) => {
// //     const r = idx % 5;
// //     switch (r) {
// //       case 0:
// //         return "rotate-[0.6deg] translate-y-0";
// //       case 1:
// //         return "-rotate-[0.6deg] translate-y-1";
// //       case 2:
// //         return "rotate-[1deg] translate-y-0.5";
// //       case 3:
// //         return "-rotate-[0.8deg] translate-y-1.5";
// //       default:
// //         return "rotate-[0.2deg]";
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 font-sans">
// //       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
// //         {/* LEFT COLUMN: mini overview + conflicts */}
// //         <aside className="col-span-3 space-y-4">
// //           {/* Mini month card */}
// //           <div className="rounded-2xl bg-white shadow-neu p-4 border border-gray-100">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <div className="text-xs text-gray-500">Month</div>
// //                 <div className="mt-1 text-xl font-bold text-gray-800">
// //                   {currentMonth.format("MMMM YYYY")}
// //                 </div>
// //               </div>

// //               <div className="space-x-2 flex items-center">
// //                 <button
// //                   onClick={handlePrev}
// //                   className="w-9 h-9 rounded-md bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:scale-105 transition"
// //                 >
// //                   ‹
// //                 </button>
// //                 <button
// //                   onClick={handleNext}
// //                   className="w-9 h-9 rounded-md bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:scale-105 transition"
// //                 >
// //                   ›
// //                 </button>
// //               </div>
// //             </div>

// //             {/* compact week strip */}
// //             <div className="mt-4 grid grid-cols-7 gap-1">
// //               {Array.from({ length: 7 }).map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className="text-[11px] text-center text-gray-400 py-1 rounded-md"
// //                 >
// //                   {dayjs().startOf("week").add(i, "day").format("dd")}
// //                 </div>
// //               ))}
// //             </div>

// //             {/* little mosaic preview (mini month) */}
// //             <div className="mt-3 grid grid-cols-7 gap-1">
// //               {days.slice(0, 21).map((d, i) => (
// //                 <div
// //                   key={i}
// //                   className={`text-[11px] text-center py-1 rounded ${d.month() === currentMonth.month() ? "text-gray-700" : "text-gray-300"}`}
// //                 >
// //                   {d.date()}
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="mt-4 flex gap-2">
// //               <button
// //                 onClick={handleToday}
// //                 className="flex-1 text-sm py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium shadow hover:brightness-105 transition"
// //               >
// //                 Today
// //               </button>
// //               <button
// //                 onClick={() => setCurrentMonth(dayjs())}
// //                 className="w-9 h-9 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center"
// //                 aria-label="reset"
// //               >
// //                 ⟳
// //               </button>
// //             </div>
// //           </div>

// //           {/* Conflicts stack */}
// //           <div className="rounded-2xl bg-white shadow-neu p-3 border border-gray-100">
// //             <div className="flex items-center justify-between mb-2">
// //               <h3 className="text-sm font-semibold text-gray-800">Conflicts</h3>
// //               <div className="text-xs text-gray-400">{conflictList.length}</div>
// //             </div>

// //             {conflictList.length === 0 ? (
// //               <div className="text-xs text-gray-400">No conflicts this month ✨</div>
// //             ) : (
// //               <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
// //                 {conflictList.map((e) => (
// //                   <div
// //                     key={e.id}
// //                     className="flex items-start gap-3 p-2 rounded-lg bg-rose-50 border border-rose-100"
// //                   >
// //                     <div className="w-2 h-8 rounded-full bg-rose-300 mt-0.5 shadow-sm" />
// //                     <div className="flex-1">
// //                       <div className="text-sm font-medium text-gray-800">
// //                         {e.title}
// //                       </div>
// //                       <div className="text-[12px] text-gray-500">
// //                         {dayjs(e.date).format("MMM D")} • {e.time} •{" "}
// //                         {e.durationMinutes}m
// //                       </div>
// //                     </div>
// //                     <div className="text-rose-600 text-xs font-semibold">⚠</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Quick legend */}
// //           <div className="rounded-2xl bg-white p-3 border border-gray-100 shadow-neu">
// //             <div className="flex items-center justify-between mb-2">
// //               <div className="text-sm font-medium text-gray-800">Legend</div>
// //               <div className="text-xs text-gray-400">Events</div>
// //             </div>
// //             <div className="flex flex-wrap gap-2">
// //               {[
// //                 "Work",
// //                 "Study",
// //                 "Meet",
// //                 "Gym",
// //                 "Content",
// //                 "Other",
// //               ].map((t, i) => (
// //                 <span
// //                   key={t}
// //                   className="text-[12px] px-3 py-1 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm"
// //                 >
// //                   {t}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //         </aside>

// //         {/* RIGHT: playful calendar mosaic */}
// //         <main className="col-span-9">
// //           {/* top header (keeps HeaderBar usage) */}
// //           <div className="mb-4">
// //             <HeaderBar
// //               currentMonth={currentMonth}
// //               handlePrev={handlePrev}
// //               handleNext={handleNext}
// //               handleToday={handleToday}
// //             />
// //           </div>

// //           {/* mosaic: 7 columns but cards have variable heights */}
// //           <div className="grid grid-cols-7 gap-4">
// //             {days.map((d, idx) => {
// //               const inCurrentMonth = d.month() === currentMonth.month();
// //               const dayEvents = getEventsForDay(d);
// //               const hasConflict = dayEvents.some((ev) => ev.conflict);
// //               const isToday = d.isSame(today, "day");

// //               // vary height for playful modern look (but keep deterministic)
// //               const heightClass =
// //                 idx % 6 === 0
// //                   ? "min-h-[120px]"
// //                   : idx % 6 === 1
// //                   ? "min-h-[140px]"
// //                   : idx % 6 === 2
// //                   ? "min-h-[110px]"
// //                   : idx % 6 === 3
// //                   ? "min-h-[150px]"
// //                   : "min-h-[125px]";

// //               return (
// //                 <div
// //                   key={idx}
// //                   onClick={() => handleDateClick(d)}
// //                   className={`relative p-3 rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${heightClass} ${tiltClasses(
// //                     idx
// //                   )} ${inCurrentMonth ? "bg-white" : "bg-gray-50"} 
// //                     ${hasConflict ? "ring-2 ring-rose-200" : "border border-transparent"} shadow-card`}
// //                   title={d.format("YYYY-MM-DD")}
// //                 >
// //                   {/* Top bar with date bubble and little badge */}
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-2">
// //                       <div
// //                         className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm ${
// //                           isToday
// //                             ? "bg-gradient-to-tr from-indigo-500 to-sky-400 text-white shadow-md"
// //                             : "bg-gray-100 text-gray-700"
// //                         }`}
// //                       >
// //                         {d.date()}
// //                       </div>

// //                       <div className="flex items-center gap-1">
// //                         {hasConflict ? (
// //                           <span className="text-rose-500 text-xs font-medium">
// //                             ⚠ Conflict
// //                           </span>
// //                         ) : (
// //                           dayEvents.length > 0 && (
// //                             <span className="text-xs text-gray-500">
// //                               {dayEvents.length} events
// //                             </span>
// //                           )
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* tiny decorative dot */}
// //                     <div
// //                       className={`w-2.5 h-2.5 rounded-full ${
// //                         inCurrentMonth ? "bg-green-300" : "bg-gray-200"
// //                       }`}
// //                     />
// //                   </div>

// //                   {/* Event chips — floating, rounded */}
// //                   <div className="mt-3 flex flex-col gap-2 overflow-hidden">
// //                     {dayEvents.slice(0, 3).map((e, i) => (
// //                       <div
// //                         key={e.id}
// //                         className={`flex items-center justify-between gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${e.conflict
// //                           ? "bg-rose-100 text-rose-800 border border-rose-200"
// //                           : colorPalette[e.colorIndex % colorPalette.length]
// //                         }`}
// //                         style={{
// //                           transform: `translateX(${(i % 2 === 0 ? -2 : 2)}px)`,
// //                         }}
// //                       >
// //                         <div className="truncate max-w-[150px]">{e.title}</div>
// //                         <div className="text-[11px] opacity-90">{e.time}</div>
// //                       </div>
// //                     ))}

// //                     {dayEvents.length > 3 && (
// //                       <div className="text-[12px] text-gray-400">
// //                         +{dayEvents.length - 3} more
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* subtle bottom card accent */}
// //                   <div className="absolute -bottom-2 left-4 right-4 h-6 rounded-b-xl opacity-30 pointer-events-none"
// //                        style={{
// //                          background:
// //                            "linear-gradient(90deg, rgba(99,102,241,0.04), rgba(56,189,248,0.04))",
// //                        }}
// //                   />
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* bottom helpful footer */}
// //           <div className="mt-6 flex items-center justify-between">
// //             <div className="text-sm text-gray-500">
// //               Tip: Click any day with events to open the playful event drawer.
// //             </div>
// //             <div className="text-xs text-gray-400">Made with ✨</div>
// //           </div>
// //         </main>
// //       </div>

// //       {/* PLAYFUL MODAL (same data shown) */}
// //       {selectedDate && (
// //         <div
// //           id="modal-bg"
// //           onClick={(e) => e.target.id === "modal-bg" && closeModal()}
// //           className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
// //         >
// //           <div className="w-full md:w-[720px] max-h-[86vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white p-4 md:p-6 shadow-2xl border border-gray-100">
// //             <div className="flex items-center justify-between mb-4">
// //               <div>
// //                 <div className="text-xs text-gray-400">
// //                   {selectedDate.format("dddd")}
// //                 </div>
// //                 <div className="text-xl font-bold text-gray-800">
// //                   {selectedDate.format("MMMM D, YYYY")}
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={closeModal}
// //                 className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:scale-105 transition"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <div className="space-y-3">
// //               {getEventsForDay(selectedDate).map((event) => (
// //                 <div
// //                   key={event.id}
// //                   className={`p-4 rounded-2xl flex items-start gap-4 border ${
// //                     event.conflict
// //                       ? "bg-rose-50 border-rose-100"
// //                       : "bg-white border-gray-100"
// //                   } shadow-sm`}
// //                 >
// //                   <div
// //                     className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold"
// //                     style={{
// //                       background:
// //                         !event.conflict
// //                           ? "linear-gradient(90deg, rgba(99,102,241,0.07), rgba(14,165,233,0.06))"
// //                           : "linear-gradient(90deg, rgba(253,224,221,0.06), rgba(254,228,226,0.05))",
// //                     }}
// //                   >
// //                     {event.time}
// //                   </div>
// //                   <div className="flex-1">
// //                     <div className="flex items-center justify-between">
// //                       <div className="text-sm font-semibold text-gray-800">
// //                         {event.title}
// //                       </div>
// //                       {event.conflict && (
// //                         <div className="text-rose-600 font-medium">⚠ Conflict</div>
// //                       )}
// //                     </div>
// //                     <div className="text-xs text-gray-500 mt-1">
// //                       {event.time} • {event.durationMinutes} minutes
// //                     </div>
// //                     <div className="text-[13px] text-gray-600 mt-2">
// //                       {event.description || "No extra details provided."}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="mt-4 flex justify-end gap-3">
// //               <button
// //                 onClick={closeModal}
// //                 className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-100"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Tailwind-like custom shadows (can be copied into your global CSS if needed) */}
// //       <style>{`
// //         .shadow-neu { box-shadow: 8px 10px 18px rgba(16,24,40,0.06), -8px -6px 14px rgba(255,255,255,0.7); }
// //         .shadow-card { box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
// //       `}</style>
// //     </div>
// //   );
// // }






























































// import React, { useEffect, useMemo, useState } from "react";
// import dayjs from "dayjs";
// import eventsData from "../data/events.json";
// import HeaderBar from "./HeaderBar";

// export default function MonthCalendar2() {
//   const [currentMonth, setCurrentMonth] = useState(dayjs());
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     setEvents(
//       eventsData.map((e) => ({
//         ...e,
//         colorIndex: Math.floor(Math.random() * 6),
//       }))
//     );
//   }, []);

//   const handlePrev = () => setCurrentMonth((m) => m.subtract(1, "month"));
//   const handleNext = () => setCurrentMonth((m) => m.add(1, "month"));
//   const handleToday = () => setCurrentMonth(dayjs());
//   const today = dayjs();

//   const parseTimeToMinutes = (timeStr) => {
//     if (!timeStr) return 0;
//     const [h, m] = timeStr.split(":").map((p) => parseInt(p, 10) || 0);
//     return h * 60 + m;
//   };

//   const findConflicts = (eventList) => {
//     const cloned = eventList.map((e) => ({ ...e, conflict: false }));
//     for (let i = 0; i < cloned.length; i++) {
//       for (let j = i + 1; j < cloned.length; j++) {
//         const a = cloned[i];
//         const b = cloned[j];
//         if (a.date === b.date) {
//           const startA = parseTimeToMinutes(a.time);
//           const endA = startA + (parseInt(a.durationMinutes, 10) || 60);
//           const startB = parseTimeToMinutes(b.time);
//           const endB = startB + (parseInt(b.durationMinutes, 10) || 60);
//           if (startA < endB && endA > startB) {
//             cloned[i].conflict = true;
//             cloned[j].conflict = true;
//           }
//         }
//       }
//     }
//     return cloned;
//   };

//   const conflictedEvents = useMemo(() => findConflicts(events), [events]);

//   const eventsThisMonth = useMemo(() => {
//     return conflictedEvents.filter((e) => {
//       const eventDate = dayjs(e.date);
//       return (
//         eventDate.month() === currentMonth.month() &&
//         eventDate.year() === currentMonth.year()
//       );
//     });
//   }, [conflictedEvents, currentMonth]);

//   const conflictList = useMemo(() => {
//     return eventsThisMonth.filter((e) => e.conflict);
//   }, [eventsThisMonth]);

//   const getEventsForDay = (date) =>
//     eventsThisMonth.filter((e) => e.date === date.format("YYYY-MM-DD"));

//   const handleDateClick = (date) => {
//     const dayEvents = getEventsForDay(date);
//     if (dayEvents.length > 0) setSelectedDate(date);
//   };
//   const closeModal = () => setSelectedDate(null);

//   const startOfMonth = currentMonth.startOf("month");
//   const endOfMonth = currentMonth.endOf("month");
//   const startDate = startOfMonth.startOf("week");
//   const endDate = endOfMonth.endOf("week");

//   const days = [];
//   let iter = startDate.clone();
//   while (iter.isBefore(endDate, "day") || iter.isSame(endDate, "day")) {
//     days.push(iter);
//     iter = iter.add(1, "day");
//   }

//   const colorPalette = [
//     "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-100",
//     "bg-gradient-to-r from-purple-50 to-pink-50 text-pink-800 border-pink-100",
//     "bg-gradient-to-r from-emerald-50 to-teal-50 text-teal-800 border-teal-100",
//     "bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-800 border-amber-100",
//     "bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-800 border-cyan-100",
//     "bg-gradient-to-r from-rose-50 to-fuchsia-50 text-fuchsia-800 border-fuchsia-100",
//   ];

//   const tiltClasses = (idx) => {
//     const r = idx % 5;
//     switch (r) {
//       case 0:
//         return "rotate-[0.6deg] translate-y-0";
//       case 1:
//         return "-rotate-[0.6deg] translate-y-1";
//       case 2:
//         return "rotate-[1deg] translate-y-0.5";
//       case 3:
//         return "-rotate-[0.8deg] translate-y-1.5";
//       default:
//         return "rotate-[0.2deg]";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 font-sans">
//       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

//         {/* LEFT COLUMN */}
//         <aside className="col-span-3 space-y-4">

//           {/* Mini Calendar FIXED ✅ */}
//           <div className="rounded-2xl bg-white shadow-neu p-4 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-xs text-gray-500">Month</div>
//                 <div className="mt-1 text-xl font-bold text-gray-800">
//                   {currentMonth.format("MMMM YYYY")}
//                 </div>
//               </div>

//               <div className="space-x-2 flex items-center">
//                 <button onClick={handlePrev} className="w-9 h-9 rounded-md bg-white border shadow-sm">‹</button>
//                 <button onClick={handleNext} className="w-9 h-9 rounded-md bg-white border shadow-sm">›</button>
//               </div>
//             </div>

//             {/* weekday names */}
//             <div className="mt-4 grid grid-cols-7 gap-1">
//               {Array.from({ length: 7 }).map((_, i) => (
//                 <div key={i} className="text-[11px] text-center text-gray-400 py-1">
//                   {dayjs().startOf("week").add(i, "day").format("dd")}
//                 </div>
//               ))}
//             </div>

//             {/* ✅ FIXED MINI CALENDAR — shows full month */}
//             <div className="mt-3 grid grid-cols-7 gap-1">
//               {days.map((d, i) => (
//                 <div
//                   key={i}
//                   className={`text-[11px] text-center py-1 rounded
//                     ${d.month() === currentMonth.month() ? "text-gray-700 font-semibold" : "text-gray-300"}
//                     ${d.isSame(today, "day") ? "bg-indigo-500 text-white rounded-md" : ""}
//                   `}
//                 >
//                   {d.date()}
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 flex gap-2">
//               <button onClick={handleToday} className="flex-1 text-sm py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow">
//                 Today
//               </button>
//               <button onClick={() => setCurrentMonth(dayjs())} className="w-9 h-9 rounded-lg bg-white border shadow-sm">
//                 ⟳
//               </button>
//             </div>
//           </div>

//           {/* Conflicts UI (unchanged) */}
//           <div className="rounded-2xl bg-white shadow-neu p-3 border border-gray-100">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-sm font-semibold text-gray-800">Conflicts</h3>
//               <div className="text-xs text-gray-400">{conflictList.length}</div>
//             </div>

//             {conflictList.length === 0 ? (
//               <div className="text-xs text-gray-400">No conflicts this month ✨</div>
//             ) : (
//               <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
//                 {conflictList.map((e) => (
//                   <div key={e.id} className="flex items-start gap-3 p-2 rounded-lg bg-rose-50 border border-rose-100">
//                     <div className="w-2 h-8 rounded-full bg-rose-300 mt-0.5" />
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-gray-800">{e.title}</div>
//                       <div className="text-[12px] text-gray-500">
//                         {dayjs(e.date).format("MMM D")} • {e.time} • {e.durationMinutes}m
//                       </div>
//                     </div>
//                     <div className="text-rose-600 text-xs font-semibold">⚠</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </aside>

//         {/* RIGHT BIG CALENDAR — unchanged */}
//         <main className="col-span-9">
//           <div className="mb-4">
//             <HeaderBar currentMonth={currentMonth} handlePrev={handlePrev} handleNext={handleNext} handleToday={handleToday} />
//           </div>

//           <div className="grid grid-cols-7 gap-4">
//             {days.map((d, idx) => {
//               const inCurrentMonth = d.month() === currentMonth.month();
//               const dayEvents = getEventsForDay(d);
//               const hasConflict = dayEvents.some((ev) => ev.conflict);
//               const isToday = d.isSame(today, "day");

//               const heightClass =
//                 idx % 6 === 0 ? "min-h-[120px]" :
//                 idx % 6 === 1 ? "min-h-[140px]" :
//                 idx % 6 === 2 ? "min-h-[110px]" :
//                 idx % 6 === 3 ? "min-h-[150px]" :
//                 "min-h-[125px]";

//               return (
//                 <div
//                   key={idx}
//                   onClick={() => handleDateClick(d)}
//                   className={`relative p-3 rounded-2xl cursor-pointer transition-transform hover:scale-[1.01] 
//                   ${heightClass} ${tiltClasses(idx)}
//                   ${inCurrentMonth ? "bg-white" : "bg-gray-50"}
//                   ${hasConflict ? "ring-2 ring-rose-200" : "border border-transparent"} shadow-card`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm
//                           ${isToday ? "bg-gradient-to-tr from-indigo-500 to-sky-400 text-white" : "bg-gray-100 text-gray-700"}
//                         `}
//                       >
//                         {d.date()}
//                       </div>

//                       <div className="flex items-center gap-1">
//                         {hasConflict ? (
//                           <span className="text-rose-500 text-xs font-medium">⚠ Conflict</span>
//                         ) : (
//                           dayEvents.length > 0 && (
//                             <span className="text-xs text-gray-500">
//                               {dayEvents.length} events
//                             </span>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-3 flex flex-col gap-2 overflow-hidden">
//                     {dayEvents.slice(0, 3).map((e, i) => (
//                       <div
//                         key={e.id}
//                         className={`flex items-center justify-between gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${
//                           e.conflict
//                             ? "bg-rose-100 text-rose-800 border border-rose-200"
//                             : colorPalette[e.colorIndex % colorPalette.length]
//                         }`}
//                         style={{
//                           transform: `translateX(${(i % 2 === 0 ? -2 : 2)}px)`,
//                         }}
//                       >
//                         <div className="truncate max-w-[150px]">{e.title}</div>
//                         <div className="text-[11px] opacity-90">{e.time}</div>
//                       </div>
//                     ))}

//                     {dayEvents.length > 3 && (
//                       <div className="text-[12px] text-gray-400">
//                         +{dayEvents.length - 3} more
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </main>

//       </div>

//       <style>{`
//         .shadow-neu { box-shadow: 8px 10px 18px rgba(16,24,40,0.06), -8px -6px 14px rgba(255,255,255,0.7); }
//         .shadow-card { box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
//       `}</style>
//     </div>
//   );
// }
  


























import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import eventsData from "../data/events.json";
import HeaderBar from "./HeaderBar";

export default function MonthCalendar2() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setEvents(
      eventsData.map((e) => ({
        ...e,
        colorIndex: Math.floor(Math.random() * 6),
      }))
    );
  }, []);

  const handlePrev = () => setCurrentMonth((m) => m.subtract(1, "month"));
  const handleNext = () => setCurrentMonth((m) => m.add(1, "month"));
  const handleToday = () => setCurrentMonth(dayjs());
  const today = dayjs();

  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map((p) => parseInt(p, 10) || 0);
    return h * 60 + m;
  };

  const findConflicts = (eventList) => {
    const cloned = eventList.map((e) => ({ ...e, conflict: false }));
    for (let i = 0; i < cloned.length; i++) {
      for (let j = i + 1; j < cloned.length; j++) {
        const a = cloned[i];
        const b = cloned[j];
        if (a.date === b.date) {
          const startA = parseTimeToMinutes(a.time);
          const endA = startA + (parseInt(a.durationMinutes, 10) || 60);
          const startB = parseTimeToMinutes(b.time);
          const endB = startB + (parseInt(b.durationMinutes, 10) || 60);
          if (startA < endB && endA > startB) {
            cloned[i].conflict = true;
            cloned[j].conflict = true;
          }
        }
      }
    }
    return cloned;
  };

  const conflictedEvents = useMemo(() => findConflicts(events), [events]);

  const eventsThisMonth = useMemo(() => {
    return conflictedEvents.filter((e) => {
      const eventDate = dayjs(e.date);
      return (
        eventDate.month() === currentMonth.month() &&
        eventDate.year() === currentMonth.year()
      );
    });
  }, [conflictedEvents, currentMonth]);

  const conflictList = useMemo(() => {
    return eventsThisMonth.filter((e) => e.conflict);
  }, [eventsThisMonth]);

  const getEventsForDay = (date) =>
    eventsThisMonth.filter((e) => e.date === date.format("YYYY-MM-DD"));

  const handleDateClick = (date) => {
    const dayEvents = getEventsForDay(date);
    if (dayEvents.length > 0) setSelectedDate(date);
  };
  const closeModal = () => setSelectedDate(null);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let iter = startDate.clone();
  while (iter.isBefore(endDate, "day") || iter.isSame(endDate, "day")) {
    days.push(iter);
    iter = iter.add(1, "day");
  }

  const colorPalette = [
    "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-100",
    "bg-gradient-to-r from-purple-50 to-pink-50 text-pink-800 border-pink-100",
    "bg-gradient-to-r from-emerald-50 to-teal-50 text-teal-800 border-teal-100",
    "bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-800 border-amber-100",
    "bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-800 border-cyan-100",
    "bg-gradient-to-r from-rose-50 to-fuchsia-50 text-fuchsia-800 border-fuchsia-100",
  ];

  const tiltClasses = (idx) => {
    const r = idx % 5;
    switch (r) {
      case 0:
        return "rotate-[0.6deg] translate-y-0";
      case 1:
        return "-rotate-[0.6deg] translate-y-1";
      case 2:
        return "rotate-[1deg] translate-y-0.5";
      case 3:
        return "-rotate-[0.8deg] translate-y-1.5";
      default:
        return "rotate-[0.2deg]";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <aside className="col-span-3 space-y-4">

          {/* Mini Calendar FIXED ✅ */}
          <div className="rounded-2xl bg-white shadow-neu p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Month</div>
                <div className="mt-1 text-xl font-bold text-gray-800">
                  {currentMonth.format("MMMM YYYY")}
                </div>
              </div>

              <div className="space-x-2 flex items-center">
                <button onClick={handlePrev} className="w-9 h-9 rounded-md bg-white border shadow-sm">‹</button>
                <button onClick={handleNext} className="w-9 h-9 rounded-md bg-white border shadow-sm">›</button>
              </div>
            </div>

            {/* weekday names */}
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="text-[11px] text-center text-gray-400 py-1">
                  {dayjs().startOf("week").add(i, "day").format("dd")}
                </div>
              ))}
            </div>

            {/* ✅ FIXED MINI CALENDAR — shows full month */}
            <div className="mt-3 grid grid-cols-7 gap-1">
              {days.map((d, i) => (
                <div
                  key={i}
                  className={`text-[11px] text-center py-1 rounded
                    ${d.month() === currentMonth.month() ? "text-gray-700 font-semibold" : "text-gray-300"}
                    ${d.isSame(today, "day") ? "bg-indigo-500 text-white rounded-md" : ""}
                  `}
                >
                  {d.date()}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={handleToday} className="flex-1 text-sm py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow">
                Today
              </button>
              <button onClick={() => setCurrentMonth(dayjs())} className="w-9 h-9 rounded-lg bg-white border shadow-sm">
                ⟳
              </button>
            </div>
          </div>

          {/* Conflicts UI (unchanged) */}
          <div className="rounded-2xl bg-white shadow-neu p-3 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">Conflicts</h3>
              <div className="text-xs text-gray-400">{conflictList.length}</div>
            </div>

            {conflictList.length === 0 ? (
              <div className="text-xs text-gray-400">No conflicts this month ✨</div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {conflictList.map((e) => (
                  <div key={e.id} className="flex items-start gap-3 p-2 rounded-lg bg-rose-50 border border-rose-100">
                    <div className="w-2 h-8 rounded-full bg-rose-300 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{e.title}</div>
                      <div className="text-[12px] text-gray-500">
                        {dayjs(e.date).format("MMM D")} • {e.time} • {e.durationMinutes}m
                      </div>
                    </div>
                    <div className="text-rose-600 text-xs font-semibold">⚠</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT BIG CALENDAR — unchanged */}
        <main className="col-span-9">
          <div className="mb-4">
            <HeaderBar currentMonth={currentMonth} handlePrev={handlePrev} handleNext={handleNext} handleToday={handleToday} />
          </div>

          <div className="grid grid-cols-7 gap-4">
            {days.map((d, idx) => {
              const inCurrentMonth = d.month() === currentMonth.month();
              const dayEvents = getEventsForDay(d);
              const hasConflict = dayEvents.some((ev) => ev.conflict);
              const isToday = d.isSame(today, "day");

              const heightClass =
                idx % 6 === 0 ? "min-h-[120px]" :
                idx % 6 === 1 ? "min-h-[140px]" :
                idx % 6 === 2 ? "min-h-[110px]" :
                idx % 6 === 3 ? "min-h-[150px]" :
                "min-h-[125px]";

              return (
                <div
                  key={idx}
                  onClick={() => handleDateClick(d)}
                  className={`relative p-3 rounded-2xl cursor-pointer transition-transform hover:scale-[1.01] 
                  ${heightClass} ${tiltClasses(idx)}
                  ${inCurrentMonth ? "bg-white" : "bg-gray-50"}
                  ${hasConflict ? "ring-2 ring-rose-200" : "border border-transparent"} shadow-card`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm
                          ${isToday ? "bg-gradient-to-tr from-indigo-500 to-sky-400 text-white" : "bg-gray-100 text-gray-700"}
                        `}
                      >
                        {d.date()}
                      </div>

                      <div className="flex items-center gap-1">
                        {hasConflict ? (
                          <span className="text-rose-500 text-xs font-medium">⚠ Conflict</span>
                        ) : (
                          dayEvents.length > 0 && (
                            <span className="text-xs text-gray-500">
                              {dayEvents.length} events
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 overflow-hidden">
                    {dayEvents.slice(0, 3).map((e, i) => (
                      <div
                        key={e.id}
                        className={`flex items-center justify-between gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${
                          e.conflict
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : colorPalette[e.colorIndex % colorPalette.length]
                        }`}
                        style={{
                          transform: `translateX(${(i % 2 === 0 ? -2 : 2)}px)`,
                        }}
                      >
                        <div className="truncate max-w-[150px]">{e.title}</div>
                        <div className="text-[11px] opacity-90">{e.time}</div>
                      </div>
                    ))}

                    {dayEvents.length > 3 && (
                      <div className="text-[12px] text-gray-400">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

      </div>

      <style>{`
        .shadow-neu { box-shadow: 8px 10px 18px rgba(16,24,40,0.06), -8px -6px 14px rgba(255,255,255,0.7); }
        .shadow-card { box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
      `}</style>
    </div>
  );
}
