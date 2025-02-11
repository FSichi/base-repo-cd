import ImgSamPic from 'assets/img/sam-altman.webp';
import { useTranslation } from 'react-i18next';
import { generalItemTranslation } from 'utils/helpers/general.helpers';
import { TranslationsKeys } from 'utils/i18n';

interface Props {}

const quotes = [
    generalItemTranslation('auth_layout_quote_1', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_2', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_3', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_4', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_5', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_6', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_7', TranslationsKeys.AUTH),
    generalItemTranslation('auth_layout_quote_8', TranslationsKeys.AUTH),
];

export const QuoteSection = (_props: Props) => {
    const { t } = useTranslation(TranslationsKeys.AUTH);

    return (
        <section className="text-cia-white">
            <div className="flex gap-3 mb-4 items-center">
                <img
                    src={ImgSamPic}
                    alt="Sam-Altman-pic"
                    className="rounded-full size-12 p-px bg-gradient2 object-cover"
                />
                <div>
                    <h2>Sam Altman</h2>
                    <p>{t('auth_layout_quote_charge')} - OpenAI</p>
                </div>
            </div>
            <q className="italic">{quotes[Math.floor(Math.random() * quotes.length)]}</q>
        </section>
    );
};
