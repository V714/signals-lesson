import { Component, OnInit, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

interface Fact {
  fact: string;
  length: number;
}

interface FactResponse {
  data: Fact[];
  total: number;
}

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.sass'],
})
export class ApiComponent implements OnInit {
  factsResponse = signal<FactResponse>({ data: [], total: 0 });

  // Non writable - lazily evaluated - memoized
  factsLength = computed(() => this.factsResponse().total);
  facts = computed(() => this.factsResponse().data);

  displayedColumns: string[] = ['fact', 'length'];

  constructor(private readonly _http: HttpClient) {}

  ngOnInit() {
    this.downloadFacts();
  }

  handlePaginator(page: PageEvent) {
    this.downloadFacts(page.pageSize, page.pageIndex);
  }

  downloadFacts(size: number = 10, page: number = 0) {
    this._http
      .get<any>(`https://catfact.ninja/facts?limit=${size}&page=${page + 1}`)
      .subscribe((data) => {
        this.factsResponse.set(data);
      });
  }
}
