import classNames from 'classnames';
import { ISidebarRoutes } from 'utils/interfaces/routes.types';
import { Props as ContainerProps } from './Sidebar.container';
import { Styles } from './Sidebar.styled';
import { motion, MotionValue } from 'framer-motion';
import { ITranslate } from 'utils/interfaces/general.types';
import { CustomIcon } from 'components/Icon/CustomIcon';
import { areAllRoutesDisabled } from 'utils/helpers/general.helpers';
import { RoutesListPaths } from 'routes';

interface Props extends ContainerProps {
    t: ITranslate;
    y: MotionValue<number>;
    routes: ISidebarRoutes[];
    onMenuClick: (index: number, url: RoutesListPaths) => void;
    selectedIndex: number;
}

export const Sidebar = (props: Props) => {
    const { routes, y, onMenuClick } = props;

    return (
        <section className={Styles.container}>
            <div className='flex flex-col justify-center items-center w-[270px]'>
                <div className='relative mt-4 h-[675px]'>
                    {!areAllRoutesDisabled(routes) && (
                        <motion.div
                            style={{
                                height: '48px',
                                background: 'linear-gradient(90deg, #5266FF 0%, #B871FF 100%)',
                                position: 'absolute',
                                width: '212px',
                                left: '4px',
                                borderRadius: '8px',
                                y,
                                zIndex: 0,
                            }}
                        />
                    )}

                    <div className='w-[220px] flex justify-center'>
                        <div>
                            {routes.map(({ Icon, title, active, path }, index) => (
                                <div key={index}>
                                    <div
                                        className={classNames(
                                            index !== 0 && 'mt-3',
                                            Styles.menuCompanyContainer,
                                            {
                                                [Styles.buttonTextActive]: active,
                                                [Styles.buttonTextNormal]: !active,
                                            },
                                        )}
                                        onClick={() => onMenuClick(index, path!)}>
                                        <div className={Styles.menuContent}>
                                            <div className={Styles.iconContainer}>
                                                <CustomIcon
                                                    Icon={Icon}
                                                    activeColor='#FFFFFF'
                                                    color='#7169FF'
                                                    isActive={active}
                                                    size={24}
                                                    className='group-hover:stroke-white'
                                                />
                                            </div>
                                            <p>{title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
