import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.interface';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Room } from '../../../admin/models/room.model';
import { RoomService } from '../../../admin/services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promotion } from '../../models/promotiones.model';
import { PromotionService } from '../../services/promotiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-hoteles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-hoteles.component.html',
  styleUrl: './detail-hoteles.component.scss'
})
export class DetailHotelesComponent implements OnInit {
  hotel?: Hotel;
  rooms: Room[] = [];
  loading = true;
  promotions: Promotion[] = [];
  
  promotionsHotel: Promotion[] = [];
  promotionsRooms: Promotion[] = [];

  selectedDates: { [roomId: string]: { startDate: string; endDate: string } } = {};

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private promotionService: PromotionService,
    private router: Router
  ) {}

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hotelService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.loadRooms();
          this.loadPromotions(); 
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener detalle del hotel:', err);
          this.loading = false;
        }
      });
    }
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (allRooms) => {
        if (this.hotel) {
          this.rooms = allRooms.filter(
            (room) => room.hotelId?.toLowerCase() === this.hotel?.id.toLowerCase()
          );

          // inicializamos las fechas para cada habitación
          this.rooms.forEach((room) => {
            this.selectedDates[room.id!] = {
              startDate: '',
              endDate: ''
            };
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener habitaciones:', err);
      }
    });
  }

loadPromotions(): void {
  if (this.hotel?.id) {
    this.promotionService.getByHotel(this.hotel.id).subscribe({
      next: (data) => {
        // Generales del hotel
        this.promotionsHotel = data.filter(promo =>
          promo.hotelId && !promo.roomId && !promo.customerId && !promo.restaurantId
        );

        // Promos ligadas a cuartos
        this.promotionsRooms = data.filter(promo =>
          promo.roomId !== null && promo.roomId !== undefined
        );
      },
      error: (err) => console.error('Error al obtener promociones del hotel:', err)
    });
  }
}

reservar(room: Room): void {
  const fechas = this.selectedDates[room.id!];

  if (!fechas.startDate || !fechas.endDate) {
    alert('Por favor selecciona las fechas de inicio y fin.');
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const start = new Date(fechas.startDate);
  const end = new Date(fechas.endDate);

  if (start < today) {
    alert('La fecha de inicio no puede ser anterior a hoy.');
    return;
  }

  if (end <= start) {
    alert('La fecha de fin debe ser mayor a la fecha de inicio.');
    return;
  }

  // Verificamos disponibilidad
  this.roomService.getRoomAvailability(room.id!, fechas.startDate, fechas.endDate).subscribe({
    next: (available) => {
      if (!available) {
        alert(`La habitación ${room.roomNumber} no está disponible entre ${fechas.startDate} y ${fechas.endDate}`);
        return;
      }

      // 🔎 1. Buscar promociones generales válidas del hotel
      let applicablePromotion: Promotion | undefined;

      applicablePromotion = this.promotionsHotel.find((promo) => {
        const promoStart = new Date(promo.startDate);
        const promoEnd = new Date(promo.endDate);
        return start >= promoStart && end <= promoEnd;
      });

      // 🔎 2. Si no hay promoción general, revisar promociones de la habitación
      if (!applicablePromotion) {
        applicablePromotion = this.promotionsRooms.find((promo) => {
          const promoStart = new Date(promo.startDate);
          const promoEnd = new Date(promo.endDate);
          return promo.roomId === room.id && start >= promoStart && end <= promoEnd;
        });
      }

      // Aplicar descuento
      const discount = applicablePromotion ? applicablePromotion.discountPercentage : 0;
      const promoId = applicablePromotion ? applicablePromotion.id : undefined;

      // Calcular días
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Calcular total
      const totalPrice = (room.pricePerDay * days) * (1 - discount / 100);

      const reservation: Reservation = {
        customerId: '8bbb48e3-68b6-4b2f-9b09-35ee1706980c',
        roomId: room.id!,
        startDate: fechas.startDate,
        endDate: fechas.endDate,
        state: 'ocupada',
        pricePerDay: room.pricePerDay,
        maintenanceCostPerDay: room.maintenanceCostPerDay,
        discountPercentage: discount,
        promotionId: promoId,
        totalPrice: totalPrice
      };

      this.reservationService.createReservation(reservation).subscribe({
        next: () => {
          alert(
            `Habitación ${room.roomNumber} reservada con éxito del ${fechas.startDate} al ${fechas.endDate}\n` +
            (applicablePromotion 
              ? `Se aplicó la promoción "${applicablePromotion.name}" con ${discount}% de descuento.`
              : 'No se aplicó ninguna promoción.')
          );
          this.loadRooms();
        },
        error: (err) => {
          console.error('Error al reservar habitación:', err);
          alert('No se pudo realizar la reserva');
        }
      });
    },
    error: (err) => {
      console.error('Error al verificar disponibilidad:', err);
      alert('No se pudo verificar la disponibilidad de la habitación.');
    }
  });
}

getPromotionForRoom(roomId: string): Promotion | undefined {
  return this.promotionsRooms.find((promo) => promo.roomId === roomId);
}

  verDetalles(id: string) {
    this.router.navigate(['client/ver-opinion-hotel', id]);
  }
}