import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-areachart',
  standalone: true,
  templateUrl: './areachart.component.html',
  styleUrls: ['./areachart.component.scss']
})
export class AreachartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  private readonly contributions: number[] = [
    20000, 35000, 40000, 40000, 30000, 45000,
    28000, 47000, 45000, 50000, 37000, 42000
  ];

  private readonly months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Monthly Contribution',
            data: this.contributions,
            fill: true,
            backgroundColor: '#BAC3FF',
            borderColor: 'transparent',
            borderWidth: 0,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      },
      options: this.getOptions()
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private getOptions(): ChartOptions<'line'> {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          align: 'start',
          labels: {
            font: {
              family: 'DM Sans, sans-serif'
            }
          }
        },
        title: {
          display: true,
          text: 'Statistics',
          align: 'start',
          font: {
            family: 'DM Sans, sans-serif',
            size: 18
          }
        },
        subtitle: {
          display: true,
          text: 'Year 2024',
          align: 'start',
          font: {
            family: 'DM Sans, sans-serif'
          }
        },
        tooltip: {
          enabled: true
        }
      },
      layout: {
        padding: 0
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months',
            font: {
              family: 'DM Sans, sans-serif'
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Contribution',
            font: {
              family: 'DM Sans, sans-serif',
            }
          },
          ticks: {
      font: {
        family: 'DM Sans, sans-serif',
        size: 8 
      }
    },
          grid: {
            display: false
          }
        }
      }
    };
  }
}
