import { useAuthContext } from 'context/auth.context';
import { useMemo } from 'react';
import { useGet } from './useGet';
import { AreaService } from 'db/services/app';
import { userAreasAdapter } from 'db/adapters/user.adapters';

interface Props {
    companySelected?: string;
    onlyEnabled?: boolean;
}

export const useGetAreasList = ({ companySelected, onlyEnabled = false }: Props) => {
    const { credentials } = useAuthContext();

    const areasQuery = useMemo(
        () =>
            `page=0&pageSize=1000&orderField=name&orderDescending=false&companyId=${companySelected || credentials?.company?.id}${onlyEnabled ? '&onlyEnabled=true' : ''}`,
        [credentials, companySelected, onlyEnabled],
    );

    const {
        data: areasData,
        isLoading: isLoadingAreas,
        isSuccess: isSuccessAreas,
    } = useGet({
        name: 'Areas Dropdown List',
        queryFilter: areasQuery,
        endpoint: () => AreaService.getAreasList(areasQuery),
        adapter: data => userAreasAdapter(data),
    });

    return { areasData, isLoadingAreas, isSuccessAreas };
};
