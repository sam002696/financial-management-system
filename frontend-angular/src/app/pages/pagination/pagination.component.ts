import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() meta: any;  // pagination metadata
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    // Handling page change event
    onPageChange(page: number): void {
        if (page > 0 && page <= this.meta.totalPages) {
            this.pageChanged.emit(page);  // Emitting the selected page
        }
    }

    // Generating page numbers
    getPageRange(): number[] {
        const range = [];
        for (let i = 1; i <= this.meta.totalPages; i++) {
            range.push(i);
        }
        return range;
    }

    // Determine if Previous and Next buttons should be disabled
    isPreviousDisabled(): boolean {
        return this.meta.currentPage === 1;
    }

    isNextDisabled(): boolean {
        return this.meta.currentPage === this.meta.totalPages;
    }

    // Calculating the start index for the current page
    getStartIndex(): number {
        return (this.meta.currentPage - 1) * this.meta.size + 1;
    }

    // Calculating the end index for the current page
    getEndIndex(): number {
        const end = this.meta.currentPage * this.meta.size;
        return end > this.meta.total ? this.meta.total : end;
    }
}
