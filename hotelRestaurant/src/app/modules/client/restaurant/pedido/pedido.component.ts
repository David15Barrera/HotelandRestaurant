import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);

  orders: Order[] = [];
  customerId = '8bbb48e3-68b6-4b2f-9b09-35ee1706980c'; // ⚡ debes obtenerlo del token o sesión

  ngOnInit(): void {
    this.orderService.getByCustomer(this.customerId).subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }

  verDetalle(orderId: string) {
    this.router.navigate(['/client/pedidos-detail', orderId]);
  }

  cancelarPedido(order: Order) {
    if (confirm('¿Seguro que deseas cancelar este pedido?')) {
      const updatedOrder: Partial<Order> = {
        ...order,
        status: 'CANCELLED'
      };
      this.orderService.update(order.id, updatedOrder).subscribe({
        next: () => {
          order.status = 'CANCELLED';
          alert('Pedido cancelado con éxito');
        },
        error: (err) => console.error('Error al cancelar pedido:', err)
      });
    }
  }
}