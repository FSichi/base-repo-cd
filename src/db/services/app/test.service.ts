import { ApiFactory } from 'db/services/main.service';
import { TEST_BASE_URL } from 'db/api/apiConstants';
import { Test, TestDTO } from 'db/interfaces/Test';

const testApi = new ApiFactory(TEST_BASE_URL);

export default {
    getAreasList: (params?: string) => testApi.get<Test>('', params),
    createAreaById: (body: TestDTO) => testApi.post<Test>('', body),
    editAreaById: (id: string, body: TestDTO) => testApi.put<Test>(`${id}`, body),
    enableAreaById: (id: string) => testApi.patch<{}>(`${id}`),
    disableAreaById: (id: string) => testApi.delete<{}>(`${id}`),
};
