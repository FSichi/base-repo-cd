import { CompanyItemFormatted } from 'db/interfaces/Company';
import { Props as ContainerProps } from './CompanySelector.container';
import { Styles } from './CompanySelector.styled';
import { ITranslate } from 'utils/interfaces/general.types';
import { CustomDropdown } from 'components/CustomDropdown';
import { CustomIcon } from 'components/Icon/CustomIcon';
import { ArrowsIcon } from 'assets/icons';
import GenericCompanyIMG from 'assets/img/generic-company.png';

interface Props extends ContainerProps {
    t: ITranslate;
    companiesList: CompanyItemFormatted[];
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    handleSelectCompany: (companyId: number) => void;
    selectedCompany: CompanyItemFormatted;
}

export const CompanySelector = (props: Props) => {
    const { isOpen, setIsOpen, selectedCompany, companiesList, handleSelectCompany } = props;

    const Trigger = () => {
        return (
            <>
                <p className={Styles.companyLabel}>EMPRESA</p>
                <div onClick={() => setIsOpen(true)} className={Styles.accountContainer}>
                    {/* <div className="flex gap-2 items-center">
                         <img
                            src={selectedCompany.urlLogo}
                            alt=""
                            style={{
                                backgroundColor: 'white',
                                width: '30px',
                                height: '20px',
                                objectFit: 'contain',
                            }}
                        /> 
                    </div> */}
                    <p className={Styles.accountSubTitle}>{selectedCompany.name}</p>
                    <CustomIcon Icon={ArrowsIcon} size={18} color="white" />
                </div>
            </>
        );
    };

    const Content = () => {
        return (
            <div className={Styles.listWrapper}>
                <div className={Styles.listContainer}>
                    {companiesList.map(({ id, name, urlLogo }, index) => (
                        <div
                            key={index}
                            className={`w-[95%] cursor-pointer ${index !== companiesList.length - 1 ? Styles.lastListItem : 'mb-2'}`}
                            onClick={() => handleSelectCompany(id)}>
                            <div
                                className={`p-2 rounded-md ${selectedCompany.id === id ? Styles.listActiveItem : Styles.listDisabledItem}`}>
                                <div className={Styles.listItemContent}>
                                    <img
                                        src={urlLogo || GenericCompanyIMG}
                                        className={Styles.listItemImg}
                                    />
                                    <p className={Styles.listItemLabel}>{name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <CustomDropdown
            id="select-company-dropdown"
            placement="right-start"
            trigger={<Trigger />}
            isOpen={isOpen}
            customContentStyles={Styles.listPositioning}
            onClose={() => setIsOpen(false)}>
            <Content />
        </CustomDropdown>
    );
};
