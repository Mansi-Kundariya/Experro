import useEmblaCarousel from 'embla-carousel-react';
import { IconArrowDown } from '../assets/icons/arrow-down';
import ExpLinkParser from '../utils/link-parser';
import { useCallback } from 'react';
import { HeroIconArrowLeft } from '../assets/icons/arrow-left-two';
import { HeroIconArrowRight } from '../assets/icons/arrow-right-two';

const CMSDemoPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <>
      <div className="animate-pulse">
        <div className="sidebar-block has-accordion sidebar-expanded">
          <h5 className="sidebar-title h-4 bg-gray-200 rounded mb-2"></h5>
          <ul className="sidebar-nav-list space-y-2">
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
          </ul>
        </div>
        <div className="sidebar-block has-accordion sidebar-expanded">
          <h5 className="sidebar-title h-4 bg-gray-200 rounded mb-2"></h5>
          <ul className="sidebar-nav-list space-y-2">
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
          </ul>
        </div>
        <div className="sidebar-block has-accordion sidebar-expanded">
          <h5 className="sidebar-title h-4 bg-gray-200 rounded mb-2"></h5>
          <ul className="sidebar-nav-list space-y-2">
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
            <li>
              <div className="h-4 w-4 bg-gray-200 rounded mr-2 inline-block"></div>
              <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
            </li>
          </ul>
        </div>
      </div>
      <nav>
        <ul className="relative flex flex-wrap items-center justify-center gap-12 *:text-sm *:font-normal">
          <li className="has-subnav-item nav-item group">
            <div className="link-wrap">
              <ExpLinkParser
                to="/"
                className="flex items-center py-5 transition-colors group-hover:text-primary"
              >
                Shop
                <i className="icon menu-arrow-icon ml-2 transition-transform group-hover:rotate-180 [&>svg]:h-[10px] [&>svg]:w-[10px] [&>svg]:stroke-secondary group-hover:[&>svg]:stroke-primary">
                  <IconArrowDown />
                </i>
              </ExpLinkParser>
            </div>
            <div className="has-subnav absolute top-full hidden min-w-[240px] rounded bg-white py-2 shadow group-hover:block">
              <ul className="*:text-sm *:font-normal">
                <li className="group/level1">
                  <ExpLinkParser
                    to="/"
                    className="block px-6 py-2 transition-colors group-hover/level1:text-primary"
                  >
                    Brands
                  </ExpLinkParser>
                </li>
                <li className="group/level1">
                  <ExpLinkParser
                    to="/"
                    className="block px-6 py-2 transition-colors group-hover/level1:text-primary"
                  >
                    Limited Edition
                  </ExpLinkParser>
                </li>
                <li className="group/level1">
                  <ExpLinkParser
                    to="/"
                    className="block px-6 py-2 transition-colors group-hover/level1:text-primary"
                  >
                    Sale
                  </ExpLinkParser>
                </li>
                <li className="group/level1">
                  <ExpLinkParser
                    to="/"
                    className="block px-6 py-2 transition-colors group-hover/level1:text-primary"
                  >
                    Pages
                  </ExpLinkParser>
                </li>
                <li className="group/level1">
                  <ExpLinkParser
                    to="/"
                    className="block px-6 py-2 transition-colors group-hover/level1:text-primary"
                  >
                    Blog
                  </ExpLinkParser>
                </li>
              </ul>
            </div>
          </li>
          <li className="group">
            <ExpLinkParser
              to="/"
              className="flex items-center py-5 transition-colors group-hover:text-primary"
            >
              Brands
            </ExpLinkParser>
          </li>
          <li className="group">
            <ExpLinkParser
              to="/"
              className="flex items-center py-5 transition-colors group-hover:text-primary"
            >
              Limited Edition
            </ExpLinkParser>
          </li>
          <li className="group">
            <ExpLinkParser
              to="/"
              className="flex items-center py-5 transition-colors group-hover:text-primary"
            >
              Sale
            </ExpLinkParser>
          </li>
          <li className="group">
            <ExpLinkParser
              to="/"
              className="flex items-center py-5 transition-colors group-hover:text-primary"
            >
              Pages
            </ExpLinkParser>
          </li>
          <li className="group">
            <ExpLinkParser
              to="/"
              className="flex items-center py-5 transition-colors group-hover:text-primary"
            >
              Blog
            </ExpLinkParser>
          </li>
        </ul>
      </nav>

      {/* HERO CAROUSAL START */}
      <div className='mb-12 md:mb-16 lg:mb-28 hero-carousal-main'>
        <div className="relative embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            <div className="embla__slide hero-carousal-wrap relative basis-full shrink-0 min-w-0">
              <div className="min-h-[25rem] max-h-[25rem] lg:min-h-[37.5rem] lg:max-h-[37.5rem] [&>img]:min-h-[inherit] [&>img]:max-h-[inherit] [&>img]:object-cover image-block">
                <img src="https://excore-bigcommerce-demo.experro.com/mm-images/banner-2-1-1--ue45vyjy.png" alt="Hero Carousal" width={1920} height={600} />
              </div>
              <div className="w-full max-w-[70%] absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center content-block">
                <h2 className='text-3xl font-secondary mb-4 heading'>
                  Best chairs in town
                </h2>
                <p className='text-sm mb-8 description'>
                  Filling the home with the beautiful creation of wood
                </p>
                <ExpLinkParser to='' className='button-primary button-large'>
                  Shop now
                </ExpLinkParser>
              </div>
            </div>
            <div className="embla__slide hero-carousal-wrap relative basis-full shrink-0 min-w-0">
              <div className="min-h-[25rem] max-h-[25rem] lg:min-h-[37.5rem] lg:max-h-[37.5rem] [&>img]:min-h-[inherit] [&>img]:max-h-[inherit] [&>img]:object-cover image-block">
                <img src="https://excore-bigcommerce-demo.experro.com/mm-images/banner-2-1-1--ue45vyjy.png" alt="Hero Carousal" width={1920} height={600} />
              </div>
              <div className="w-full max-w-[70%] absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center content-block">
                <h2 className='text-3xl font-secondary mb-4 heading'>
                  Best chairs in town
                </h2>
                <p className='text-sm mb-8 description'>
                  Filling the home with the beautiful creation of wood
                </p>
                <ExpLinkParser to='' className='button-primary button-large'>
                  Shop now
                </ExpLinkParser>
              </div>
            </div>
            <div className="embla__slide hero-carousal-wrap relative basis-full shrink-0 min-w-0">
              <div className="min-h-[25rem] max-h-[25rem] lg:min-h-[37.5rem] lg:max-h-[37.5rem] [&>img]:min-h-[inherit] [&>img]:max-h-[inherit] [&>img]:object-cover image-block">
                <img src="https://excore-bigcommerce-demo.experro.com/mm-images/banner-2-1-1--ue45vyjy.png" alt="Hero Carousal" width={1920} height={600} />
              </div>
              <div className="w-full max-w-[70%] absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center content-block">
                <h2 className='text-3xl font-secondary mb-4 heading'>
                  Best chairs in town
                </h2>
                <p className='text-sm mb-8 description'>
                  Filling the home with the beautiful creation of wood
                </p>
                <ExpLinkParser to='' className='button-primary button-large'>
                  Shop now
                </ExpLinkParser>
              </div>
            </div>
          </div>
          <div className="embla__controls">
            <div className="embla__buttons">
              <button className="absolute left-4 xl:left-[13.75rem] top-2/4 -translate-y-[50%] leading-[0] embla__prev" onClick={scrollPrev}>
                <i className="icon w-8 h-8 lg:w-12 lg:h-12 [&>svg]:stroke-secondary">
                  <HeroIconArrowLeft />
                </i>
              </button>
              <button className="absolute right-4 xl:right-[13.75rem] top-2/4 -translate-y-[50%] leading-[0] embla__next" onClick={scrollNext}>
                <i className="icon w-8 h-8 lg:w-12 lg:h-12 [&>svg]:stroke-secondary">
                  <HeroIconArrowRight />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* HERO CAROUSAL END */}

      {/* CTA START */}
      <section className='mb-12 md:mb-16 lg:mb-28 cta-section-main'>
        <div className='cta-section-wrap relative basis-full shrink-0 overflow-hidden'>
          <div className="min-h-[25rem] max-h-[25rem] lg:min-h-[37.5rem] lg:max-h-[37.5rem] [&>img]:min-h-[inherit] [&>img]:max-h-[inherit] [&>img]:object-cover image-block">
            <img src="https://excore-bigcommerce-demo.experro.com/mm-images/banner-2-1-1--ue45vyjy.png" alt="Hero Carousal" width={1920} height={600} />
          </div>
          <div className="container absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center content-block">
            <div className="py-10 content-block-wrap text-left">
              <h2 className='text-2xl lg:text-3xl font-secondary mb-4 heading'>
                Best chairs in town
              </h2>
              <p className='text-sm mb-8 description last:mb-0'>
                Filling the home with the beautiful creation of wood
              </p>
              <ExpLinkParser to='' className='button-primary button-large'>
                Shop now
              </ExpLinkParser>
            </div>
          </div>
        </div>
      </section>
      {/* CTA END */}

      <div className="zig-zag-section-main">
        <div className="container">
          <div className="zig-zag-wrapper -mx-4 flex flex-wrap items-center">
            <div className="content-block order-2 px-4 lg:order-1 lg:w-6/12">
              <h2 className="heading mb-4 font-serif text-3xl lg:mb-6 lg:text-4xl">
                Lorem ipsum
              </h2>
              <p className="description mb-6 text-sm text-gray-900 lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                placerat fermentum est, in maximus libero vestibulum non
              </p>
              <ExpLinkParser to="/" className="button-primary button-large">
                View Details
              </ExpLinkParser>
            </div>
            <div className="image-block order-1 mb-4 px-4 lg:order-2 lg:w-6/12">
              <img
                src="https://excore-bigcommerce-demo.experro.com/mm-images/frame-10863-j4et7bgh.jpeg"
                alt="ZigZag"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-20">
        <div className="mx-auto mb-20 max-w-[50%] text-center selection:bg-fuchsia-300 selection:text-fuchsia-900 xl:text-yellow-400 2xl:text-red-800">
          <p>
            So I started to walk into the water. I won't lie to you boys, I was
            terrified. But I pressed on, and as I made my way past the breakers
            a strange calm came over me. I don't know if it was divine
            intervention or the kinship of all living things but I tell you
            Jerry at that moment, I <em>was</em> a marine biologist.
          </p>
        </div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p className="my-16">
          <b>Lorem</b> <i>ipsum</i> <del>dolor</del> sit amet, consectetur
          adipisicing elit. Est, reiciendis autem. Perferendis voluptates
          dignissimos et asperiores ullam beatae esse ratione necessitatibus!
          Praesentium hic voluptatem veritatis, at aperiam ratione? Quae,
          dolorem! Harum dolorum eligendi, minus labore magni modi cumque,
          molestiae est suscipit doloribus sequi totam, a ducimus quo earum
          quod! Suscipit!
        </p>
        <div className="button-group my-10 flex gap-8">
          <a href="/" className="button-primary">
            Button
          </a>
          <a href="/" className="button-secondary">
            Button
          </a>
        </div>
        <form action="" className="-mx-4 flex flex-wrap gap-y-8">
          <div className="form-field basis-6/12 px-4">
            <label htmlFor="fullName" className="form-label">
              Full Name
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="Full Name"
            />
          </div>
          <div className="form-field basis-6/12 px-4">
            <label htmlFor="company" className="form-label">
              Company
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="company"
              className="form-input"
              placeholder="Company"
            />
          </div>
          <div className="form-field basis-full px-4">
            <label htmlFor="select" className="form-label">
              Select Services
              <span className="required">*</span>
            </label>
            <select className="form-select" name="select">
              <option
                value="SelectServices"
                label="Select Services"
                selected
                disabled
              >
                Select Services
              </option>
              <option value="Service1" label="Service 1">
                Service 1
              </option>
              <option value="Service2" label="Service 2">
                Service 2
              </option>
              <option value="Service3" label="Service 3">
                Service 3
              </option>
            </select>
          </div>
          <div className="form-field basis-full px-4">
            <label htmlFor="description" className="form-label">
              Project details
              <span className="required">*</span>
            </label>
            <textarea
              autoComplete="off"
              rows={6}
              className="form-textarea"
              placeholder="Project details (optional)"
              name="description"
              spellCheck="false"
            ></textarea>
          </div>
          <div className="form-field px-4">
            <button type="submit" className="button-primary">
              <div>Submit</div>
            </button>
          </div>
        </form>
      </div>

      {/* HEADER ------ START ----- */}
      {/* <header className="hidden header-section">
         <div className="header-top-section">
          <div className="container">
            <div className="row">
              <div className="col col-8 col-mob-12">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData?.globalSettings?.header_com?.length &&
                      pageData?.globalSettings?.header_com[0]
                        ?.pencil_banner_text_et,
                  }}
                />
              </div>

              {currencyData?.length > 1 && (
                <div className="col col-2 flex justify-right hide-for-mobile">
                  <div className="currency-selector">
                    <div className="currency-selector-inner flex align-center">
                      <span className="currency-token">
                        {selectedCurrency?.currency_code}
                      </span>
                      <i className="icon">
                        <IconArrowDownFill />
                      </i>
                    </div>

                    <ul className="currency-list">
                      {currencyData?.map((elem: CurrencyObj) => (
                        <li
                          onClick={() => handleCurrencyChange(elem)}
                          key={elem?.id}
                        >
                          <span>{elem?.currency_code}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {Boolean(languages?.length) && (
                <div className="col col-2 col-md-3 col-tab-3 flex justify-right hide-for-mobile">
                  <div className="currency-selector">
                    <div className="currency-selector-inner flex align-center">
                      <span className="currency-token">
                        {currentLanguage?.display_name}
                      </span>
                      <i className="icon">
                        <IconArrowDownFill />
                      </i>
                    </div>

                    <ul className="currency-list">
                      {languages?.map((lang: any) => (
                        <li onClick={handleLanguageChange.bind(this, lang)}>
                          <span>{lang.display_name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="header-middle-section">
          <div className="container">
            <div className="header-middle-inner">
              <div className="row flex justify-space position-relative">
                <div className="col col-2 col-tab-6 flex align-center logo-wrapper">
                  <div className="hemburger-icon-block show-for-tablet m-r-24">
                    <span className="hemburger-link">
                      <i onClick={addClassToOpenMobileMenu} className="icon">
                        <IconHemburger />
                      </i>
                    </span>
                  </div>

                  <div className="header-logo">
                    <ExpLinkParser
                      to="/"
                      title="Header Logo"
                      ariaLabel="Header Logo"
                    >
                      <img
                        src={
                          ExpImageParser(
                            pageData?.globalSettings.site_com?.length &&
                              pageData?.globalSettings.site_com[0]?.logo_media_emd
                              ? pageData?.globalSettings.site_com[0]
                                  ?.logo_media_emd[0]
                              : ""
                          )?.imageUrl
                        }
                        height="30"
                        width="92"
                        alt="Excore Logo"
                        title="Excore Logo"
                      />
                    </ExpLinkParser>
                  </div>
                </div>
                <div className="col col-8 col-tab-12 flex align-center justify-center search-section">
                  <div className="header-search-section">
                    <div className="search-bar-inner">
                      <form action="" onSubmit={handleSubmit}>
                        <input
                          ref={searchInputRef}
                          type="text"
                          className="form-input input-small"
                          placeholder="Search the store"
                          onChange={handleSearchChange}
                          value={searchText}
                          onClick={openSearchPreview}
                        />
                        <span id="search-icon">
                          {showSearchPreview && (
                            <i
                              onClick={removeClassToOpenSerch}
                              className="icon search-close-icon"
                            >
                              <IconCross />
                              <span className="tooltip">Close</span>
                            </i>
                          )}
                          {!showSearchPreview && (
                            <i
                              onClick={addClassToOpenSearch}
                              className="icon search-open-icon"
                            >
                              <IconSearch />
                              <span className="tooltip">Search</span>
                            </i>
                          )}
                        </span>
                      </form>
                    </div>
                    {showSearchPreview && (
                      <div className="search-result-block flex flex-direction justify-space">
                        <ExpSearchPreview
                          setSearchText={setSearchText}
                          searchSuggestion={searchSuggestion}
                          productData={searchResult}
                          isLoading={isLoading}
                          handleSubmit={handleSubmit}
                          searchText={searchText}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col col-2 col-tab-6 flex justify-right cart-user-section">
                  <ul className="icon-navigation flex align-center">
                    <li className="hide-for-tablet position-relative flex align-center">
                      <span onClick={handleMyAccountButtonClick}>
                        <i className="icon">
                          <IconUser />
                        </i>
                      </span>
                      <ul className="icon-navigation-subnav text-center">
                        <li>
                          <Link to="/my-account/">My Account</Link>
                        </li>
                        <li>
                          {userLoggedInStatus ? (
                            <span onClick={handleLogout}>Log Out</span>
                          ) : (
                            <Link to="/login/">Login</Link>
                          )}
                        </li>
                      </ul>
                    </li>

                    <li className="flex align-center">
                      <span
                        onClick={openCartSlider}
                        className="cart-link"
                        ref={basketRef}
                      >
                        <i className="icon has-tooltip">
                          <IconBasket />
                          <span className="cart-count">{cartQuantity}</span>
                          <span className="tooltip">Cart</span>
                        </i>
                      </span>
                      <ExpCartPreview
                        isCartPreview={isOpenCartPreview}
                        setIsCartPreview={setIsOpenCartPreview}
                        basketRef={basketRef}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation-wrapper mobile-menu-section">
          <div className="container">
            <div className="mobile-menu-topbar show-for-tablet">
              <div className="menu-clone-button">
                <i onClick={removeClassToCloseMobileMenu} className="icon">
                  <IconCross />
                </i>
              </div>
              <div className="mobile-account-link flex align-center">
                <i className="icon m-r-10">
                  <IconUser />
                </i>
                {!userLoggedInStatus ? (
                  <p>
                    <Link to="/login/" className="reverse-color">
                      Log In &nbsp;
                    </Link>
                    /
                    <Link to="/sign-up/" className="reverse-color">
                      &nbsp; Create account
                    </Link>
                  </p>
                ) : (
                  <>
                    <span onClick={handleLogout}>Log Out &nbsp;</span>/
                    <Link to="/my-account/" className="reverse-color">
                      &nbsp; My account
                    </Link>
                  </>
                )}
              </div>
            </div>

            <nav className="header-navigation">
              <ExpMenu
                menuLinkObj={pageData?.globalSettings?.header_com}
                ulClasses={"flex align-center primary-navigation"}
                liClasses={"nav-item"}
                linkNameClasses={"nav-link flex align-center"}
                keyValueForMenu={"primary_navigation_menu_id_et"}
                iconForNavChild={
                  <i className="icon menu-arrow-icon">
                    <IconArrowDown />
                  </i>
                }
                index={0}
              />
            </nav>
          </div>
        </div>
      </header> */}
      {/* HEADER ------ END ----- */}
    </>
  );
};

export default CMSDemoPage;
