export default class PageableNavigation {
    static create(pageable) {
        if (!pageable) return '';

        return `
        <p class='text-muted'>Exibindo ${pageable.numberOfElements} de ${pageable.totalElements}</p>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item ${pageable.first ? 'disabled' : ''}">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                ${[...Array(pageable.totalPages).keys()].map(i =>
                    `
                    <li class="page-item"><a class="page-link" href="#">${i+1}</a></li>
                    `
                ).join('')}
                <li class="page-item ${pageable.last ? 'disabled' : ''}">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
        `;
    }
}