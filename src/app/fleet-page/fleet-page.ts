import { Component, AfterViewInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [ ],
  templateUrl: './fleet-page.html',
  styleUrls: ['./fleet-page.scss'], 
})
export class FleetPage implements AfterViewInit, OnDestroy {

  // Element-Refs
  private board!: HTMLDivElement;
  private shipList!: HTMLDivElement;
  private rotateBtn!: HTMLButtonElement;

  // Drag-State
  private selectedShip: HTMLDivElement | null = null;
  private draggingShip: HTMLDivElement | null = null;
  private offsetX = 0;
  private offsetY = 0;

  // Damit wir Listener sauber entfernen können
  private unsubs: Array<() => void> = [];

  ngAfterViewInit(): void {
    // NACH dem Rendern erst DOM finden
    const board = document.getElementById('board');
    const shipList = document.getElementById('shipList');
    const rotateBtn = document.getElementById('rotateBtn');

    if (!board || !shipList || !rotateBtn) {
      console.error('Fehlen IDs: board, shipList oder rotateBtn im HTML');
      return;
    }

    this.board = board as HTMLDivElement;
    this.shipList = shipList as HTMLDivElement;
    this.rotateBtn = rotateBtn as HTMLButtonElement;

    // Init: Ship sizes + events
    const ships = Array.from(document.querySelectorAll('.ship')) as HTMLDivElement[];
    ships.forEach((ship) => {
      this.setShipSize(ship);

      this.listen(ship, 'click', () => this.selectShip(ship));

      this.listen(ship, 'dblclick', (e: MouseEvent) => {
        e.preventDefault();
        this.selectShip(ship);
        this.rotateShip(ship);
      });

      this.listen(ship, 'pointerdown', (e: PointerEvent) => {
        e.preventDefault();
        this.draggingShip = ship;
        this.selectShip(ship);

        ship.setPointerCapture(e.pointerId);

        const rect = ship.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;
      });

      this.listen(ship, 'pointermove', (e: PointerEvent) => {
        if (!this.draggingShip || this.draggingShip !== ship) return;
        e.preventDefault();
        this.moveShipToBoard(ship, e.clientX, e.clientY);
      });

      this.listen(ship, 'pointerup', (e: PointerEvent) => {
        if (!this.draggingShip || this.draggingShip !== ship) return;
        e.preventDefault();

        if (!this.isPointInsideBoard(e.clientX, e.clientY)) {
          this.returnShipToList(ship);
        } else {
          this.snapShipToGrid(ship);
          this.keepShipInsideBoard(ship);
        }

        this.draggingShip = null;
      });

      this.listen(ship, 'pointercancel', () => {
        this.draggingShip = null;
      });
    });

    // Rotate button
    this.listen(this.rotateBtn, 'click', () => this.rotateShip(this.selectedShip));
  }

  ngOnDestroy(): void {
    // Listener entfernen (wichtig in Angular)
    this.unsubs.forEach(fn => fn());
    this.unsubs = [];
  }

  // ---------- Helpers ----------
  private listen<T extends EventTarget>(
    el: T,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): void {
    el.addEventListener(event, handler);
    this.unsubs.push(() => el.removeEventListener(event, handler));
  }
private getCellSize(): number {
  const cssVal = getComputedStyle(this.board).getPropertyValue('--cell').trim();
  return parseFloat(cssVal) || 38;
}


  private setShipSize(ship: HTMLDivElement): void {
    const len = Number(ship.dataset['len'] || 1);
    const cell = this.getCellSize();

    const vertical = ship.classList.contains('vertical');
    ship.style.width = vertical ? `${cell}px` : `${len * cell}px`;
    ship.style.height = vertical ? `${len * cell}px` : `${cell}px`;
  }

  private selectShip(ship: HTMLDivElement): void {
    document.querySelectorAll('.ship.selected').forEach(s => s.classList.remove('selected'));
    this.selectedShip = ship;
    ship.classList.add('selected');
  }

  private rotateShip(ship: HTMLDivElement | null): void {
    if (!ship) return;
    ship.classList.toggle('vertical');
    this.setShipSize(ship);

    if (ship.parentElement === this.board) {
      this.snapShipToGrid(ship);
      this.keepShipInsideBoard(ship);
    }
  }

  private snapShipToGrid(ship: HTMLDivElement): void {
    const cell = this.getCellSize();
    const x = parseFloat(ship.style.left || '0');
    const y = parseFloat(ship.style.top || '0');

    ship.style.left = `${Math.round(x / cell) * cell}px`;
    ship.style.top  = `${Math.round(y / cell) * cell}px`;
  }

  private keepShipInsideBoard(ship: HTMLDivElement): void {
    const bw = this.board.clientWidth;
    const bh = this.board.clientHeight;
    const sw = ship.offsetWidth;
    const sh = ship.offsetHeight;

    let x = parseFloat(ship.style.left || '0');
    let y = parseFloat(ship.style.top || '0');

    x = Math.max(0, Math.min(x, bw - sw));
    y = Math.max(0, Math.min(y, bh - sh));

    ship.style.left = `${x}px`;
    ship.style.top  = `${y}px`;
  }

  private isPointInsideBoard(clientX: number, clientY: number): boolean {
    const r = this.board.getBoundingClientRect();
    return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
  }

  private moveShipToBoard(ship: HTMLDivElement, clientX: number, clientY: number): void {
    if (ship.parentElement !== this.board) {
      this.board.appendChild(ship);
      ship.style.position = 'absolute';
      ship.style.margin = '0';
    }

    const r = this.board.getBoundingClientRect();
    const x = clientX - r.left - this.offsetX;
    const y = clientY - r.top - this.offsetY;

    ship.style.left = `${x}px`;
    ship.style.top  = `${y}px`;

    this.keepShipInsideBoard(ship);
  }

  private returnShipToList(ship: HTMLDivElement): void {
    ship.style.position = '';
    ship.style.left = '';
    ship.style.top = '';
    ship.style.margin = '';
    this.shipList.appendChild(ship);
    this.setShipSize(ship);
  }
}
