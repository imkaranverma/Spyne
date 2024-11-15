export interface DashboardInterface {
  summary_chart_data: SummaryChartGroupInterface;
  service_request_status: ServiceRequest[];
  performance_overview: OverviewInterface[];
}

export interface OverviewInterface {
  label: string;
  value: number;
  color: string;
  chart: Chart;
}

export interface Chart {
  label: number[];
  data: number[];
}

export interface ServiceRequest {
  label: string;
  data: number;
  color: string;
  legend: Legend;
}

export interface Legend {
  display: boolean;
  position: string;
}

export interface SummaryChartGroupInterface {
  insurance_pending_status: SummaryChartInterface;
  daily_status: SummaryChartInterface;
}
export interface SummaryChartInterface {
  payment_not_completed: {
    color: string;
    label: string;
  };
  pdf_not_recieved: {
    color: string;
    label: string;
  };
  data: Datum[];
}

export interface Datum {
  label: number;
  payment_not_completed: number;
  pdf_not_recieved: number;
}
