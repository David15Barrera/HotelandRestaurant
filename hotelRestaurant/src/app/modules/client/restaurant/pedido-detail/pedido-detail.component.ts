import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { Order } from '../../models/order.model';
import { OrderDetail } from '../../models/order-detail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detail.component.html',
  styleUrl: './pedido-detail.component.scss'
})
export class PedidoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private orderDetailService = inject(OrderDetailService);

  order?: Order;
  details: OrderDetail[] = [];

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      // Obtener el pedido
      this.orderService.getById(orderId).subscribe({
        next: (data) => this.order = data,
        error: (err) => console.error(' Error al obtener pedido:', err)
      });

      // Obtener detalles de ese pedido
      this.orderDetailService.getByOrder(orderId).subscribe({
        next: (data) => this.details = data,
        error: (err) => console.error(' Error al obtener detalles del pedido:', err)
      });
    }
  }
}