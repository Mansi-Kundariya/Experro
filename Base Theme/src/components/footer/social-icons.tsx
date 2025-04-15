import { Fragment } from 'react';
import ExpLinkParser from '../../utils/link-parser';
import { IconInsta } from '../../assets/icons/insta';
import { IconTwitter } from '../../assets/icons/twitter';
import { IconFacebook } from '../../assets/icons/facebook';
import { IconLinkedin } from '../../assets/icons/linkedin';
import { IconPinterest } from '../../assets/icons/pintrest';
import { IconTiktok } from '../../assets/icons/icon-tiktok';
import { IconYoutube } from '../../assets/icons/icon-youtube';

interface SocialIconsProps {
  pageData: {
    globalSettings: {
      social_links_com: any[];
      footer_com: any[];
    };
  };
}

const socialList = [
  {
    socialMedia: 'Facebook',
    socialLink: 'facebook_link_et',
    icons: IconFacebook,
  },
  {
    socialMedia: 'Twitter',
    socialLink: 'twitter_link_et',
    icons: IconTwitter,
  },
  {
    socialMedia: 'Instagram',
    socialLink: 'instagram_link_et',
    icons: IconInsta,
  },
  {
    socialMedia: 'Linkedin',
    socialLink: 'linkedin_link_et',
    icons: IconLinkedin,
  },
  {
    socialMedia: 'Pinterest',
    socialLink: 'pinterest_link_et',
    icons: IconPinterest,
  },
  {
    socialMedia: 'TickTock',
    socialLink: 'tiktok_link_et',
    icons: IconTiktok,
  },
  {
    socialMedia: 'youtube',
    socialLink: 'youtube_link_et',
    icons: IconYoutube,
  },
];

const SocialIcons = ({ pageData }: SocialIconsProps) => {
  return (
    <>
      {pageData?.globalSettings?.social_links_com?.length &&
        (pageData?.globalSettings?.social_links_com?.[0]?.facebook_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.instagram_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.pinterest_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.tiktok_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.linkedin_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.twitter_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.youtube_link_et) && (
          <>
            {pageData?.globalSettings?.footer_com &&
              pageData?.globalSettings?.footer_com?.[0]
                ?.social_links_heading_et && (
                <p className="footer-nav-title mb-4 3xl:ml-[10px] font-secondary text-base lg:text-lg font-bold">
                  {pageData?.globalSettings?.footer_com &&
                    pageData?.globalSettings?.footer_com?.[0]
                      ?.social_links_heading_et}
                </p>
              )}
            <ul className="social-icons-main flex flex-wrap gap-2 leading-[0]">
              {socialList.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {pageData.globalSettings?.social_links_com?.length &&
                      pageData.globalSettings?.social_links_com[0][
                      item.socialLink
                      ] && (
                        <li>
                          <i className="icon w-8 h-8">
                            <ExpLinkParser
                              title={`${item.socialMedia}`}
                              ariaLabel={`${item.socialMedia}`}
                              to={`${pageData.globalSettings?.social_links_com
                                ?.length &&
                                pageData.globalSettings?.social_links_com[0][
                                item.socialLink
                                ]
                                }`}
                              target="_blank"
                              className="flex items-center justify-center h-8 w-8 [&>svg]:fill-black">
                              <item.icons />
                            </ExpLinkParser>
                          </i>
                        </li>
                      )}
                  </Fragment>
                );
              })}
            </ul>
          </>
        )}
    </>
  );
};

export default SocialIcons;
