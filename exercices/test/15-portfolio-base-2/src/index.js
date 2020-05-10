import './style/main.css'

/**
 * Lazy load
 */
const lazyLoadElements = document.querySelectorAll('.lazy-load')

for(const _lazyLoadElement of lazyLoadElements)
{
    const loaded = () =>
    {
        window.setTimeout(() =>
        {
            _lazyLoadElement.classList.add('loaded')
        }, Math.random() * 1000)
    }

    if(_lazyLoadElement.complete)
    {
        loaded()
    }
    else
    {
        _lazyLoadElement.addEventListener('load', loaded)
    }
}

/**
 * Reveal
 */
// Elements
const revealElements = document.querySelectorAll('.reveal')
const revealItems = []

for(const _revealElement of revealElements)
{
    const item = {}
    const bounding = _revealElement.getBoundingClientRect()
    item.element = _revealElement
    item.top = bounding.top
    item.height = bounding.height

    revealItems.push(item)
}

// Scroll
const revealScroll = () =>
{
    const limit = window.scrollY + window.innerHeight

    for(const _item of revealItems)
    {
        if(limit > _item.top + _item.height * 0.5)
        {
            _item.element.classList.add('revealed')
        }
    }
}

window.addEventListener('scroll', revealScroll)

// Resize
const revealResize = () =>
{
    console.log('resize')
}

window.addEventListener('resize', revealResize)
