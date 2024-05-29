import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js'
import { Console } from 'console';
import { Subscription } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-graficosCosasLindas',
  templateUrl: './graficosCosasLindas.page.html',
  styleUrls: ['./graficosCosasLindas.page.scss'],
})
export class GraficosCosasLindasPage implements OnInit, OnDestroy {
  suscripciones: Subscription[] = [];
  listaCosasLindas: Array<any> = new Array<any>();
  listaCosasFeas: Array<any> = new Array<any>();
  muestroSpinner: boolean = false;

  //#region ---------------- GRAFICO DE BARRA --------------------------------------------------------------------
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataset[] = [
    {
      data: [3, 2, 1],
      label: 'Cargando...',
      backgroundColor: ['green', 'blue', 'yellow'],
    },
  ];

  public barChartLabels: any = ['Votos', 'Votos', 'Votos'];

  public barChartOptions = {
    responsive: true,
  };
  //#endregion // --------------------------------------------------------------------------------------------------

  //#region  // ---------------- GRAFICO DE TORTA -----------------------------------------------------------------
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartDataset[] = [
    {
      data: [4, 2, 1],
      label: 'Cargando...',
      backgroundColor: ['green', 'blue', 'yellow'],
    },
  ];

  public pieChartLabels: any = ['Cargando', 'Cargando', 'Cargando'];

  public pieChartOptions = {
    responsive: true,
  };

  //#endregion --------------------------------------------------------------------------------------------------

  constructor(
    private router: Router,
    public photoService: PhotoService,
    private audioService: AudioService
  ) {
    this.muestroSpinner = false;
    this.listaCosasFeas = [];
    this.listaCosasLindas = [];

    this.cargarListaCosasLindas();
    this.cargarListaCosasFeas();
  }

  ngOnInit() {
    this.muestroSpinner = true;
    setTimeout(() => {
      this.muestroSpinner = false;
      this.cargarData();

      let graphs = document.getElementById('graphs');
      graphs.removeAttribute('hidden');
    }, 2000);
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log('unsubscribe GraficosPage ->', this.suscripciones.length);
    });
  }

  async cargarListaCosasLindas() {
    this.suscripciones.push(
      this.photoService.getCosasLindas().subscribe((res: any) => {
        this.listaCosasLindas = res;
        console.log(this.listaCosasLindas);
      })
    );
  }

  async cargarListaCosasFeas() {
    this.suscripciones.push(
      this.photoService.getCosasFeas().subscribe((res: any) => {
        this.listaCosasFeas = res;
        console.log('cargarListaCosasFeas -> ', this.listaCosasFeas);
      })
    );
  }

  public async cargarData() {
    //TORTA PARA LAS COSAS MAS LINDAS
    this.cargarDataPieChart();

    //BARRA PARA LAS COSAS MAS FEAS
    this.cargarDataBarChart();
  }

  private async cargarDataPieChart() {
    console.log('DATA:');
    console.log(this.pieChartData[0].data);

    let publicacionesCosasLindas: any;

    publicacionesCosasLindas = this.listaCosasLindas;
    console.log('publicacionesCosasLindas:');
    console.log(publicacionesCosasLindas);

    //Limpio la data y los viejos labels del pieChart
    do {
      this.pieChartData[0].data.pop();
      console.log('deleted');
    } while (this.pieChartData[0].data.length > 0);
    do {
      this.pieChartLabels.pop();
      console.log('deleted');
    } while (this.pieChartLabels.length > 0);

    //Me traigo los elementos ordenados por la cantidad de likes
    let publicacionesCosasLindasMasLikeadas = publicacionesCosasLindas.sort(
      (a, b) => {
        if (a.likes.length > b.likes.length) {
          return -1;
        }
        if (a.likes.length < b.likes.length) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    console.log('publicacionesCosasLindasMasLikeadas:');
    console.log(publicacionesCosasLindasMasLikeadas);

    //Cargo los elementos al chart
    let contador = 0;
    publicacionesCosasLindasMasLikeadas.forEach((element) => {
      // console.log(element)
      if (contador < 3) {
        this.pieChartData[0].data.push(element.likes.length);
        this.pieChartLabels.push(element.emailUsuario);
        contador++;
      }
    });

    //Actualizo el pieChart
    let charts = Chart.instances;
    console.log('charts', charts);
    setTimeout(() => {
      charts[0].update();
    }, 1500);
  }

  private async cargarDataBarChart() {
    console.log('DATA:');
    console.log(this.barChartData[0].data);

    let publicacionesCosasFeas = this.listaCosasFeas;
    console.log('publicacionesCosasFeas');
    console.log(publicacionesCosasFeas);
    console.log('this.barChartData[0] ->', this.barChartData[0]);
    //Limpio la data y los viejos labels del barChart
    do {
      this.barChartData[0].data.pop();
      console.log('deleted');
    } while (this.barChartData[0].data.length > 0);
    this.barChartData[0].label = '';
    do {
      this.barChartLabels.pop();
      console.log('deleted');
    } while (this.barChartLabels.length > 0);
    console.log('this.barChartData[0] ->', this.barChartData[0]);

    //Me traigo los elementos ordenados por la cantidad de likes
    let publicacionesCosasFeasMasLikeadas = publicacionesCosasFeas.sort(
      (a, b) => {
        if (a.likes.length > b.likes.length) {
          return -1;
        }
        if (a.likes.length < b.likes.length) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    //Cargo los elementos al chart
    let contador = 0;
    publicacionesCosasFeasMasLikeadas.forEach((element) => {
      console.log(element);
      if (contador < 3) {
        this.barChartData[0].data.push(element.likes.length);
        this.barChartLabels.push(element.emailUsuario);
        contador++;
      }
    });

    //Actualizo el pieChart
    let charts = Chart.instances;
    setTimeout(() => {
      charts[1].update();
      console.log(' update charts[1] ', charts[1]);
    }, 1500);
  }

  public click(e: any) {
    console.log(e);
  }

  onVolver() {
    this.audioService.onAudio(this.audioService.volver);
    // this.ngOnDestroy();
    // this.router.navigate(['/home']);
    this.router.navigateByUrl('home');
  }
}