import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../../client/models/reservation.interface';
import { Room } from '../../../models/room.model';
import { Hotel } from '../../../../client/models/hotel.interface';
import { ReservationService } from '../../../../client/services/reservation.service';
import { RoomService } from '../../../services/room.service';
import { HotelService } from '../../../../client/services/hotel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas-admin.component.html',
  styleUrl: './reservas-admin.component.scss'
})
export class ReservasAdminComponent implements OnInit {
  reservations: Reservation[] = [];
  rooms: Room[] = [];
  hotels: Hotel[] = [];
  loading = true;
editingReservation: Reservation | null = null;
  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}
openEditModal(reservation: Reservation) {
  // Crear copia para no modificar el original antes de guardar
  this.editingReservation = { ...reservation };
}
closeEditModal() {
  this.editingReservation = null;
}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Cargar habitaciones y hoteles primero
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;

        this.hotelService.getHotels().subscribe({
          next: (hotels) => {
            this.hotels = hotels;

            // Finalmente cargar reservas
            this.reservationService.getReservations().subscribe({
              next: (res) => {
                this.reservations = res.map(r => ({
                  ...r,
                  totalPrice: this.calcularTotal(r)
                }));
                this.loading = false;
              },
              error: (err) => {
                console.error('Error al cargar reservas:', err);
                this.loading = false;
              }
            });
          },
          error: (err) => {
            console.error('Error al cargar hoteles:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar habitaciones:', err);
        this.loading = false;
      }
    });
  }

  calcularTotal(reservation: Reservation): number {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * reservation.pricePerDay;
  }

  getRoomName(roomId: string): string {
    const room = this.rooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'Desconocida';
  }

  getHotelName(roomId: string): string {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return 'Desconocido';
    const hotel = this.hotels.find(h => h.id === room.hotelId);
    return hotel ? hotel.name : 'Desconocido';
  }

  eliminarReserva(reservation: Reservation) {
    if (!confirm(`¿Deseas eliminar la reserva #${reservation.id}?`)) return;

    this.reservationService.deleteReservation(reservation.id!).subscribe({
      next: () => {
        alert('Reserva eliminada correctamente');
        this.loadData();
      },
      error: (err) => {
        console.error('Error al eliminar reserva:', err);
        alert('No se pudo eliminar la reserva');
      }
    });
  }

  editarReserva(reservation: Reservation) {
    // Aquí puedes abrir un modal o formulario para editar la reserva
    const nuevaFechaFin = prompt('Ingrese nueva fecha de fin (YYYY-MM-DD):', reservation.endDate);
    if (!nuevaFechaFin) return;

    if (new Date(nuevaFechaFin) <= new Date(reservation.startDate)) {
      alert('La fecha de fin debe ser mayor a la fecha de inicio.');
      return;
    }

    const updated: Partial<Reservation> = {
      ...reservation,
      endDate: nuevaFechaFin
    };

    this.reservationService.updateReservation(reservation.id!, updated).subscribe({
      next: () => {
        alert('Reserva actualizada correctamente');
        this.loadData();
      },
      error: (err) => {
        console.error('Error al actualizar reserva:', err);
        alert('No se pudo actualizar la reserva');
      }
    });
  }

  saveEdit() {
  if (!this.editingReservation) return;

  // Validación básica de fechas
  if (new Date(this.editingReservation.endDate) <= new Date(this.editingReservation.startDate)) {
    alert('La fecha de fin debe ser mayor a la fecha de inicio.');
    return;
  }

  this.reservationService.updateReservation(this.editingReservation.id!, this.editingReservation)
    .subscribe({
      next: () => {
        alert('Reserva actualizada correctamente');
        this.loadData();
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error al actualizar reserva:', err);
        alert('No se pudo actualizar la reserva');
      }
    });
}
}