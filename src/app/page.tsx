'use client';

import { useMemo, useState } from 'react';

type Guest = {
  id: string;
  name: string;
  party: string;
  tableId: string | null;
};

type Table = {
  id: string;
  name: string;
  seats: number;
  x: number;
  y: number;
};

const INITIAL_GUESTS: Guest[] = [
  { id: 'g1', name: 'Aaliyah', party: 'Bride Family', tableId: 't1' },
  { id: 'g2', name: 'Noah', party: 'Bride Family', tableId: 't1' },
  { id: 'g3', name: 'Lucas', party: 'Groom Family', tableId: 't2' },
  { id: 'g4', name: 'Emma', party: 'Groom Family', tableId: 't2' },
  { id: 'g5', name: 'Olivia', party: 'Friends', tableId: 't3' },
  { id: 'g6', name: 'Mason', party: 'Friends', tableId: 't3' },
  { id: 'g7', name: 'Sophia', party: 'Coworkers', tableId: null },
  { id: 'g8', name: 'Ethan', party: 'Coworkers', tableId: null },
  { id: 'g9', name: 'Amelia', party: 'Neighbors', tableId: null },
  { id: 'g10', name: 'Liam', party: 'Neighbors', tableId: null },
  { id: 'g11', name: 'Mia', party: 'College Friends', tableId: null },
  { id: 'g12', name: 'James', party: 'College Friends', tableId: null },
];

const INITIAL_TABLES: Table[] = [
  { id: 't1', name: 'Table 1', seats: 6, x: 18, y: 26 },
  { id: 't2', name: 'Table 2', seats: 6, x: 48, y: 26 },
  { id: 't3', name: 'Table 3', seats: 6, x: 78, y: 26 },
  { id: 't4', name: 'Table 4', seats: 6, x: 18, y: 62 },
  { id: 't5', name: 'Table 5', seats: 6, x: 48, y: 62 },
  { id: 't6', name: 'Table 6', seats: 6, x: 78, y: 62 },
];

const PARTY_COLORS: Record<string, string> = {
  'Bride Family': 'bg-pink-100 text-pink-800 border-pink-200',
  'Groom Family': 'bg-blue-100 text-blue-800 border-blue-200',
  Friends: 'bg-purple-100 text-purple-800 border-purple-200',
  Coworkers: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Neighbors: 'bg-amber-100 text-amber-800 border-amber-200',
  'College Friends': 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

export default function Home() {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [draggingGuestId, setDraggingGuestId] = useState<string | null>(null);

  const tableCounts = useMemo(() => {
    return tables.reduce<Record<string, number>>((acc, table) => {
      acc[table.id] = guests.filter((guest) => guest.tableId === table.id).length;
      return acc;
    }, {});
  }, [guests, tables]);

  const seatedCount = guests.filter((guest) => guest.tableId).length;
  const unseated = guests.filter((guest) => !guest.tableId);

  const assignGuest = (guestId: string, tableId: string | null) => {
    setGuests((current) =>
      current.map((guest) =>
        guest.id === guestId ? { ...guest, tableId } : guest,
      ),
    );
  };

  const addTable = () => {
    const nextNumber = tables.length + 1;
    const nextX = 18 + ((nextNumber - 1) % 3) * 30;
    const nextY = nextNumber <= 6 ? 26 : 62;
    setTables((current) => [
      ...current,
      {
        id: `t${nextNumber}`,
        name: `Table ${nextNumber}`,
        seats: 6,
        x: nextX,
        y: nextY,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold">Wedding Seating Planner</h1>
          <p className="mt-2 text-sm text-slate-600">
            Drag guests to a table in the hall layout. Drop a guest back to the
            waiting list to unseat them.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            <StatCard label="Guests" value={guests.length} />
            <StatCard label="Seated" value={seatedCount} />
            <StatCard label="Waiting" value={unseated.length} />
          </div>

          <div
            className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggingGuestId) {
                assignGuest(draggingGuestId, null);
                setDraggingGuestId(null);
              }
            }}
          >
            <h2 className="mb-3 font-semibold">Unassigned Guests</h2>
            {unseated.length === 0 ? (
              <p className="text-sm text-slate-500">Everyone is seated 🎉</p>
            ) : (
              <div className="space-y-2">
                {unseated.map((guest) => (
                  <GuestChip
                    key={guest.id}
                    guest={guest}
                    onDragStart={setDraggingGuestId}
                    onUnseat={assignGuest}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={addTable}
            className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            + Add Table
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Hall Layout</h2>
            <p className="text-sm text-slate-600">Drop guests on any table</p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-100">
            <Zone label="Stage" className="left-[36%] top-[4%] w-[28%]" />
            <Zone label="Dance Floor" className="left-[33%] top-[38%] w-[34%]" />
            <Zone label="Photo Booth" className="left-[5%] top-[78%] w-[22%]" />
            <Zone label="Buffet" className="left-[73%] top-[78%] w-[22%]" />

            {tables.map((table) => {
              const assignedGuests = guests.filter(
                (guest) => guest.tableId === table.id,
              );
              const occupied = tableCounts[table.id] ?? 0;
              const isFull = occupied >= table.seats;

              return (
                <div
                  key={table.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${table.x}%`, top: `${table.y}%` }}
                >
                  <div
                    className={`w-36 rounded-full border-2 p-3 text-center shadow-sm transition ${
                      isFull
                        ? 'border-rose-300 bg-rose-100'
                        : 'border-slate-300 bg-white hover:border-slate-400'
                    }`}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggingGuestId && !isFull) {
                        assignGuest(draggingGuestId, table.id);
                        setDraggingGuestId(null);
                      }
                    }}
                  >
                    <p className="text-sm font-semibold">{table.name}</p>
                    <p className="text-xs text-slate-600">
                      {occupied}/{table.seats} seats
                    </p>
                    {assignedGuests.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {assignedGuests.map((guest) => (
                          <GuestChip
                            key={guest.id}
                            guest={guest}
                            compact
                            onDragStart={setDraggingGuestId}
                            onUnseat={assignGuest}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function GuestChip({
  guest,
  onDragStart,
  onUnseat,
  compact = false,
}: {
  guest: Guest;
  compact?: boolean;
  onDragStart: (guestId: string) => void;
  onUnseat: (guestId: string, tableId: string | null) => void;
}) {
  const style = PARTY_COLORS[guest.party] ?? 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      draggable
      onDragStart={() => onDragStart(guest.id)}
      className={`cursor-grab rounded-lg border px-2 py-1 text-left text-xs ${style} ${
        compact ? 'max-w-20' : 'w-full'
      }`}
      title={`${guest.name} • ${guest.party}`}
    >
      <p className="truncate font-medium">{guest.name}</p>
      {!compact && (
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-[11px]">{guest.party}</span>
          {guest.tableId && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onUnseat(guest.id, null);
              }}
              className="rounded bg-white/70 px-1 text-[10px] font-semibold uppercase"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Zone({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`absolute rounded-xl border border-dashed border-slate-300 bg-white/70 px-2 py-1 text-center text-xs font-semibold text-slate-600 ${className}`}
    >
      {label}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-600">{label}</p>
    </div>
  );
}
