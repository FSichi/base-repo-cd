import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CompanySelector } from './CompanySelector';
import { useGet } from 'hooks/db/useGet';
import { CompanyService } from 'db/services/app';
import { Spinner } from 'components/Spinner';
import { useAuthContext } from 'context/auth.context';
import { CompanyItemFormatted } from 'db/interfaces/Company';
import { companySelectorAdapter } from 'db/adapters/company.adapters';

export interface Props {}

export const CompanySelectorContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation();
    const { setCredentials } = useAuthContext();

    const [isOpen, setIsOpen] = useState(false);
    const [hasSetted, setHasSetted] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState<CompanyItemFormatted>({
        id: 0,
        name: '',
        urlLogo: '',
    });

    const { data, isSuccess, isLoading } = useGet({
        name: 'Auth - CompanySelector',
        endpoint: () => CompanyService.getAllCompanies(),
        adapter: data => companySelectorAdapter(data),
        gcTime: Infinity,
        staleTime: Infinity,
    });

    const handleSelectCompany = (companyId: number) => {
        setCredentials(prev => ({
            ...prev!,
            company: {
                id: companyId,
                name: data?.data.find(company => company.id === companyId)?.name!,
            },
        }));
        setSelectedCompany(data?.data.find(company => company.id === companyId)!);
        setIsOpen(false);
    };

    useEffect(() => {
        if (isSuccess && !hasSetted) {
            setSelectedCompany(data?.data[0]);
            setCredentials(prev => ({
                ...prev!,
                company: {
                    id: data?.data[0].id!,
                    name: data?.data[0].name!,
                },
            }));
            setHasSetted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    const childProps = {
        ...props,
        t,
        companiesList: isSuccess ? data?.data : [],
        isOpen,
        setIsOpen,
        handleSelectCompany,
        selectedCompany,
    };

    if (isLoading) return <Spinner height="h-[94px]" size="small" />;

    return <CompanySelector {...childProps} />;
};

export const MemoizedCompanySelectorContainer = memo(CompanySelectorContainer);
