'use strict'

const db = require('../server/db')
const {User, Book, Order, OrderBook, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'abby.wigdale@gmail.com',
      password: 'password',
      firstName: 'Abby',
      lastName: 'Wigdale',
      isAdmin: true
    }),
    User.create({
      email: 'kevingislason@gmail.com',
      password: 'password',
      firstName: 'Kevin',
      lastName: 'Gislason',
      isAdmin: true
    }),
    User.create({
      email: 'tomasgnr@gmail.com',
      password: 'password',
      firstName: 'Tomas',
      lastName: 'Mariani',
      isAdmin: true
    }),
    User.create({
      email: 'tony@boetto.com',
      password: 'password',
      firstName: 'Tony',
      lastName: 'Boetto',
      isAdmin: true
    }),
    User.create({
      email: 'johndoe@invalid.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false
    }),
    User.create({
      email: 'janedoe@invalid.com',
      password: 'password',
      firstName: 'Jane',
      lastName: 'Doe',
      isAdmin: false
    })
  ])

  const books = await Promise.all([
    Book.create({
      name: 'In Search of Lost Time',
      genres: ['Novel', 'Modernist'],
      author: 'Marcel Proust',
      price: 1999,
      quantity: 5,
      imgUrl: 'img/searchlost.jpeg',
      editionType: 'hardcover',
      description: `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics."`
    }),

    Book.create({
      name: 'Don Quixote',
      genres: ['Novel'],
      author: 'Miguel de Cervantes',
      price: 1155,
      quantity: 1,
      imgUrl: 'img/donq.jpg',
      editionType: 'paperback',
      description: `Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.`
    }),
    Book.create({
      name: 'Ulysses',
      genres: ['Novel', 'Modernist'],
      author: 'James Joyce',
      price: 628,
      quantity: 4,
      editionType: 'paperback',
      imgUrl: 'img/ulysses.jpeg',
      description: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`
    }),
    Book.create({
      name: 'The Great Gatsby',
      genres: ['Novel', 'Modernist', 'Historical Fiction'],
      author: 'F. Scott Fitzgerald',
      price: 1495,
      imgUrl: 'img/greatgatsby.jpeg',
      quantity: 8,
      editionType: 'hardcover',
      description: `The novel chronicles an era that Fitzgerald himself dubbed the "Jazz Age". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity during the "roaring" 1920s as the economy soared. At the same time, Prohibition, the ban on the sale and manufacture of alcohol as mandated by the Eighteenth Amendment, made millionaires out of bootleggers and led to an increase in organized crime, for example the Jewish mafia. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was uncomfortable with the unrestrained materialism and the lack of morality that went with it, a kind of decadence.`
    }),

    Book.create({
      name: 'Moby Dick',
      genres: ['Novel', 'Adventure', 'Epic'],
      author: 'Herman Melville',
      price: 2250,
      quantity: 4,
      editionType: 'hardcover',
      imgUrl: 'img/mobydick.jpg',
      description: `First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, "the greatest novel in American literature." The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel's narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day.`
    }),

    Book.create({
      name: 'Hamlet',
      genres: ['Drama'],
      author: 'William Shakespeare',
      price: 911,
      quantity: 2,
      editionType: 'hardcover',
      imgUrl: 'img/hamlet.jpg',
      description: `The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet's father, the King, and then taken the throne and married Gertrude, Hamlet's mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption.`
    }),

    Book.create({
      name: 'War and Peace',
      genres: ['Novel'],
      author: 'Leo Tolstoy',
      price: 1954,
      quantity: 0,
      editionType: 'hardcover',
      description: `Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.`
    }),

    Book.create({
      name: 'The Odyssey',
      genres: ['Epic', 'Poetry'],
      author: 'Homer',
      price: 499,
      quantity: 8,
      editionType: 'paperback',
      imgUrl: 'img/odyssey.jpg',
      description: `The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work traditionally ascribed to Homer. The poem is fundamental to the modern Western canon. Indeed it is the second—the Iliad being the first—extant work of Western literature. It was probably composed near the end of the eighth century BC, somewhere in Ionia, the Greek-speaking coastal region of what is now Turkey. The poem mainly centers on the Greek hero Odysseus (or Ulysses, as he was known in Roman myths) and his long journey home following the fall of Troy. It takes Odysseus ten years to reach Ithaca after the ten-year Trojan War. In his absence, it is assumed he has died, and his wife Penelope and son Telemachus must deal with a group of unruly suitors, the Mnesteres or Proci, competing for Penelope's hand in marriage.`
    }),

    Book.create({
      name: 'One Hundred Years of Solitude',
      genres: ['Novel'],
      author: 'Gabriel Garcia Marquez',
      price: 1396,
      quantity: 10,
      editionType: 'paperback',
      imgUrl: 'img/solitude.jpg',
      description: `One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career. The novel tells the story of the rise and fall of the mythical town of Macondo through the history of the Buendía family. It is a rich and brilliant chronicle of life and death, and the tragicomedy of humankind. In the noble, ridiculous, beautiful, and tawdry story of the Buendía family, one sees all of humanity, just as in the history, myths, growth, and decay of Macondo, one sees all of Latin America. Love and lust, war and revolution, riches and poverty, youth and senility — the variety of life, the endlessness of death, the search for peace and truth — these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel García Márquez always writes with the simplicity, ease, andpurity that are the mark of a master. Alternately reverential and comical, One Hundred Years of Solitude weaves the political, personal, and spiritual to bring a new consciousness to storytelling. Translated into dozens of languages, this stunning work is no less than an accounting of the history of the human race.`
    }),

    Book.create({
      name: 'The Divine Comedy',
      genres: ['Epic', 'Drama', 'Poetry'],
      author: 'Dante Alighieri',
      imgUrl: 'img/divine-comedy.jpg',
      price: 1660,
      quantity: 0,
      editionType: 'paperback',
      description: `Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.`
    }),

    Book.create({
      name: 'The Brothers Karamazov',
      genres: ['Novel'],
      author: 'Fyodor Dostoyevsky',
      price: 693,
      quantity: 6,
      editionType: 'paperback',
      imgUrl: 'img/brothers.jpg',
      description: `Dostoevsky's last and greatest novel, The Karamazov Brothers, is both a brilliantly told crime story and a passionate philosophical debate. The dissolute landowner Fyodor Pavlovich Karamazov is murdered; his sons — the atheist intellectual Ivan, the hot-blooded Dmitry, and the saintly novice Alyosha — are all at some level involved. Bound up with this intense family drama is Dostoevsky's exploration of many deeply felt ideas about the existence of God, the question of human freedom, the collective nature of guilt, the disastrous consequences of rationalism. The novel is also richly comic: the Russian Orthodox Church, the legal system, and even the author's most cherished causes and beliefs are presented with a note of irreverence, so that orthodoxy and radicalism, sanity and madness, love and hatred, right and wrong are no longer mutually exclusive. Rebecca West considered it "the allegory for the world's maturity, but with children to the fore." This new translation does full justice to Dostoevsky's genius, particularly in the use of the spoken word, which ranges over every mode of human expression.`
    }),

    Book.create({
      name: 'Madame Bovary',
      genres: ['Literary Realism'],
      author: 'Gustave Flaubert',
      price: 599,
      quantity: 10,
      editionType: 'paperback',
      imgUrl: 'img/madame.jpg',
      description: `For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for "offenses against morality and religion." What shocks us today about Flaubert's devastatingly realized tale of a young woman destroyed by the reckless pursuit of her romantic dreams is its pure artistry: the poise of its narrative structure, the opulence of its prose (marvelously captured in the English translation of Francis Steegmuller), and its creation of a world whose minor figures are as vital as its doomed heroine. In reading Madame Bovary, one experiences a work that remains genuinely revolutionary almost a century and a half after its creation.`
    }),

    Book.create({
      name: 'The Adventures of Huckleberry Finn',
      genres: ['Novel', 'Adventure'],
      author: 'Mark Twain',
      price: 899,
      quantity: 4,
      editionType: 'paperback',
      imgUrl: 'img/huckfinn.jpg',
      description: `Revered by all of the town's children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literature. Unlike the tall-tale, idyllic world of Tom Sawyer, The Adventures of Huckleberry Finn is firmly grounded in early reality. From the abusive drunkard who serves as Huckleberry's father, to Huck's first tentative grappling with issues of personal liberty and the unknown, Huckleberry Finn endeavors to delve quite a bit deeper into the complexities — both joyful and tragic of life`
    }),
    Book.create({
      name: 'Lolita',
      genres: ['Novel', 'Modernist'],
      author: 'Vladimir Nabokov',
      price: 1976,
      quantity: 3,
      editionType: 'hardcover',
      imgUrl: 'img/lolita.jpg',
      description: `The book is internationally famous for its innovative style and infamous for its controversial subject: the protagonist and unreliable narrator, middle aged Humbert Humbert, becomes obsessed and sexually involved with a twelve-year-old girl named Dolores Haze.`
    }),

    Book.create({
      name: 'The Iliad',
      genres: ['Poetry', 'Epic'],
      author: 'Homer',
      price: 1632,
      quantity: 1,
      editionType: 'hardcover',
      imgUrl: 'img/iliad.jpg',
      description: `The Iliad is an epic poem in dactylic hexameters, traditionally attributed to Homer. Set in the Trojan War, the ten-year siege of Ilium by a coalition of Greek states, it tells of the battles and events during the weeks of a quarrel between King Agamemnon and the warrior Achilles. Although the story covers only a few weeks in the final year of the war, the Iliad mentions or alludes to many of the Greek legends about the siege. Along with the Odyssey, also attributed to Homer, the Iliad is among the oldest extant works of Western literature, and its written version is usually dated to around the eighth century BC. The Iliad contains approximately 15,700 lines, and is written in a literary amalgam of several Greek dialects. The authorship of the poem is disputed.`
    }),

    Book.create({
      name: 'Crime and Punishment',
      genres: ['Novel'],
      author: 'Fyodor Dostoyevsky',
      price: 2511,
      quantity: 5,
      editionType: 'hardcover',
      imgUrl: 'img/crimepunishment.png',
      description: `It is a murder story, told from a murder;s point of view, that implicates even the most innocent reader in its enormities. It is a cat-and-mouse game between a tormented young killer and a cheerfully implacable detective. It is a preternaturally acute investigation of the forces that impel a man toward sin, suffering, and grace. Ever since its publication in 1866 Crime and Punishment has intrigued readers and sorely tested translators, the best of whom seemed to capture one facet of Dostoevsky's masterpiece while missing the rest.`
    }),

    Book.create({
      name: `Alice's Adventures in Wonderland`,
      genres: ['Novel', 'Fantasy', 'Juvenile Fantasy'],
      author: 'Lewis Carroll',
      price: 1960,
      quantity: 11,
      imgUrl: 'img/alices.jpg',
      editionType: 'hardcover',
      description: `In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole. Thus began the immortal adventures of Alice, perhaps the most popular heroine in English literature. Countless scholars have tried to define the charm of the Alice books–with those wonderfully eccentric characters the Queen of Hearts, Tweedledum, and Tweedledee, the Cheshire Cat, Mock Turtle, the Mad Hatter et al.–by proclaiming that they really comprise a satire on language, a political allegory, a parody of Victorian children’s literature, even a reflection of contemporary ecclesiastical history. Perhaps, as Dodgson might have said, Alice is no more than a dream, a fairy tale about the trials and tribulations of growing up–or down, or all turned round–as seen through the expert eyes of a child.`
    }),

    Book.create({
      name: 'Wuthering Heights',
      genres: ['Novel', 'Drama'],
      author: 'Emily Brontë',
      price: 1029,
      quantity: 3,
      editionType: 'hardcover',
      imgUrl: 'img/wutheringheights.jpg',
      description: `The narrative is non-linear, involving several flashbacks, and two primary narrators: Mr. Lockwood and Ellen "Nelly" Dean. The novel opens in 1801, with Mr. Lockwood arriving at Thrushcross Grange, a grand house on the Yorkshire moors that he is renting from the surly Heathcliff, who lives at nearby Wuthering Heights. Lockwood is treated rudely, and coldly by the brooding, unsociable Heathcliff, and is forced to stay at Wuthering Heights for a night because one of the savage dogs of the Heights attacks him, and the weather turns against him. The housekeeper cautiously takes him to a chamber to sleep through the night and warns him to not speak to Heathcliff about where he is sleeping, for he would get in deep trouble.`
    }),

    Book.create({
      name: 'Pride and Prejudice',
      genres: ['Novel', 'Romance'],
      author: 'Jane Austen',
      price: 873,
      quantity: 15,
      imgUrl: 'img/prideprejudice.jpg',
      editionType: 'hardcover',
      description: `The book is narrated in free indirect speech following the main character Elizabeth Bennet as she deals with matters of upbringing, marriage, moral rightness and education in her aristocratic society. Though the book's setting is uniquely turn of the 19th century, it remains a fascination of modern readership, continuing to remain at the top of lists titled "most loved books of all time", and receiving considerable attention from literary critics. This modern interest has resulted in a number of dramatic adaptations and a plethora of books developing Austen's memorable characters further.`
    }),

    Book.create({
      name: 'The Catcher in the Rye',
      genres: ['Novel', 'Literary Realism', 'Modernist'],
      author: 'J. D. Salinger',
      price: 2034,
      quantity: 6,
      editionType: 'hardcover',
      imgUrl: 'img/catcher.jpg',
      description: `The Catcher in the Rye is a 1945 novel by J. D. Salinger. Originally published for adults, the novel has become a common part of high school and college curricula throughout the English-speaking world; it has also been translated into almost all of the world's major languages. Around 250,000 copies are sold each year, with total sales of more than sixty-five million. The novel's antihero, Holden Caulfield, has become an icon for teenage rebellion.`
    }),

    Book.create({
      name: 'The Sound and the Fury',
      genres: ['Novel', 'Modernist'],
      author: 'William Faulkner',
      price: 1766,
      quantity: 4,
      editionType: 'hardcover',
      imgUrl: 'img/sound-and-the-fury.jpg',
      description: `The Sound and the Fury is set in the fictional Yoknapatawpha County. The novel centers on the Compson family, former Southern aristocrats who are struggling to deal with the dissolution of their family and its reputation. The novel is separated into four distinct sections.`
    }),

    Book.create({
      name: 'To the Lighthouse',
      genres: ['Novel', 'Modernist'],
      author: 'Virginia Woolf',
      price: 615,
      quantity: 4,
      editionType: 'paperback',
      imgUrl: 'img/lighthouse.jpg',
      description: `A landmark novel of high modernism, the text, centering on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920, skillfully manipulates temporality and psychological exploration. The novel includes little dialogue and almost no action; most of it is written as thoughts and observations. The novel recalls the power of childhood emotions and highlights the impermanence of adult relationships. Among the book's many tropes and themes are those of loss, subjectivity, and the problem of perception.`
    }),

    Book.create({
      name: 'Heart of Darkness',
      genres: ['Novel', 'Modernist'],
      author: 'Joseph Conrad',
      price: 699,
      quantity: 2,
      editionType: 'paperback',
      imgUrl: 'img/heartofdarkness.jpg',
      description: `The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa. Although Conrad does not specify the name of the river, at this time Congo Free State, the location of the large and important Congo River, was a private colony of Belgium's King Leopold II. Marlow is employed to transport ivory downriver; however, his more pressing assignment is to return Kurtz, another ivory trader, to civilization in a cover up. Kurtz has a reputation throughout the region.`
    }),
    Book.create({
      name: 'Anna Karenina',
      genres: ['Novel', 'Literary Realism'],
      author: 'Leo Tolstoy',
      price: 1768,
      quantity: 3,
      editionType: 'hardcover',
      imgUrl: 'img/annakarenia.jpg',
      description: `Anna Karenina tells of the doomed love affair between the sensuous and rebellious Anna and the dashing officer, Count Vronsky. Tragedy unfolds as Anna rejects her passionless marriage and must endure the hypocrisies of society. Set against a vast and richly textured canvas of nineteenth-century Russia, the novel's seven major characters create a dynamic imbalance, playing out the contrasts of city and country life and all the variations on love and family happiness. While previous versions have softened the robust, and sometimes shocking, quality of Tolstoy's writing, Pevear and Volokhonsky have produced a translation true to his powerful voice. This award-winning team's authoritative edition also includes an illuminating introduction and explanatory notes. Beautiful, vigorous, and eminently readable, this Anna Karenina will be the definitive text for generations to come.`
    }),

    Book.create({
      name: '1984',
      genres: ['Novel', 'Science Fiction', 'Modernist'],
      author: 'George Orwell',
      price: 1349,
      quantity: 7,
      editionType: 'hardcover',
      imgUrl: 'img/1984.jpg',
      description: `The story follows the life of one seemingly insignificant man, Winston Smith, a civil servant assigned the task of perpetuating the regime's propaganda by falsifying records and political literature so that it appears that the government is always correct in what it says. Smith grows disillusioned with his meager existence and so begins a rebellion against the system that leads to his arrest, torture, and conversion.`
    }),

    Book.create({
      name: 'The Hobbit',
      genres: ['Novel', 'Fantasy', 'Juvenile Fantasy'],
      author: 'J.R.R. Tolkien',
      price: 870,
      quantity: 12,
      editionType: 'paperback',
      imgUrl: 'img/hobbit.jpg',
      description: `Like every other hobbit, Bilbo Baggins likes nothing better than a quiet evening in his snug hole in the ground, dining on a sumptuous dinner in front of a fire. But when a wandering wizard captivates him with tales of the unknown, Bilbo becomes restless. Soon he joins the wizard's band of homeless dwarves in search of giant spiders, savage wolves, and other dangers. Bilbo quickly tires of the quest for adventure and longs for the security of his familiar home. But before he can return to his life of comfort, he must face the greatest threat of all - a treasure-troving dragon named Smaug.
      In this fantasy classic, master storyteller J.R.R. Tolkein creates a bewitching world filled with delightful creatures and thrilling dangers. Narrator Rob Inglis will hold listeners of all ages spellbound with his skillful portrayal of hobbits, dwarves, and enchanted beasts.`
    }),

    Book.create({
      name: 'The Lord of the Rings: The Fellowship of the Ring',
      genres: ['Novel', 'Fantasy', 'Juvenile Fantasy'],
      author: 'J.R.R. Tolkien',
      price: 1274,
      quantity: 15,
      editionType: 'paperback',
      imgUrl: 'img/LORfellowship.jpg',
      description: `The Fellowship of the Ring is the first of three volumes of the epic[2] novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King. It takes place in the fictional universe of Middle-earth. It was originally published on 29 July 1954 in the United Kingdom.
      The volume consists of a foreword, in which the author discusses his writing of The Lord of the Rings, a prologue titled "Concerning Hobbits, and other matters", and the main narrative in Book I and Book II.`
    }),

    Book.create({
      name: 'The Lord of the Rings: The Two Towers',
      genres: ['Novel', 'Fantasy', 'Juvenile Fantasy'],
      author: 'J.R.R. Tolkien',
      price: 1071,
      quantity: 3,
      editionType: 'paperback',
      imgUrl: 'img/LORtowers.jpg',
      description: `The Two Towers is the second volume of J. R. R. Tolkien's high fantasy novel The Lord of the Rings. It is preceded by The Fellowship of the Ring and followed by The Return of the King.`
    }),

    Book.create({
      name: 'The Lord of the Rings: The Return of the King',
      genres: ['Novel', 'Fantasy', 'Juvenile Fantasy'],
      author: 'J.R.R. Tolkien',
      price: 1044,
      quantity: 16,
      editionType: 'paperback',
      imgUrl: 'img/LORreturn.jpg',
      description: `The Return of the King is the third and final volume of J. R. R. Tolkien's The Lord of the Rings, following The Fellowship of the Ring and The Two Towers. The story begins in the kingdom of Gondor, which is soon to be attacked by the Dark Lord Sauron.`
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: users[0].dataValues.id,
      paidFor: true,
      date: new Date(2018, 4, 24, 8, 13, 20, 0),
      status: 'completed',
      stripeToken: 'tok_1DBkcWJopqwPdSjrQUsB9PBi'
    }),
    Order.create({
      userId: users[0].dataValues.id,
      paidFor: true,
      date: new Date(2018, 5, 13, 9, 45, 30, 0),
      status: 'completed',
      stripeToken: 'tok_1DBkcWJopqwPdSjrQUsB1PBi'
    }),
    Order.create({
      userId: users[0].dataValues.id,
      paidFor: false,
      date: new Date(2018, 2, 11, 39, 15, 28, 0),
      status: 'processing',
      stripeToken: 'tok_1DBkcWJopqwPdSjrQUsB3PBi'
    }),
    Order.create({
      userId: users[0].dataValues.id,
      paidFor: true,
      date: Date.now(),
      status: 'created',
      stripeToken: 'tok_1DBkcWJopqwPdTjrQUsB9PBi'
    }),
    Order.create({
      userId: users[1].dataValues.id,
      paidFor: true,
      date: new Date(2017, 12, 30, 44, 15, 36, 0),
      status: 'canceled',
      stripeToken: 'tok_1DBkbUJopqwPdSjrBg6s0KYx'
    }),
    Order.create({
      userId: users[1].dataValues.id,
      paidFor: true,
      date: new Date(2017, 10, 22, 34, 15, 44, 0),
      status: 'completed',
      stripeToken: 'tok_1DBkbUJopqwPdSjrBg6s4KYx'
    }),
    Order.create({
      userId: users[1].dataValues.id,
      paidFor: true,
      date: new Date(2018, 7, 31, 43, 11, 23, 0),
      status: 'completed',
      stripeToken: 'tok_1DBkbUJopqwPdSjrBg6s5KYx'
    }),
    Order.create({
      userId: users[1].dataValues.id,
      paidFor: true,
      date: Date.now(),
      status: 'processing',
      stripeToken: 'tok_1DBkbUJopqwPdSjrBg6s6KYx'
    }),
    Order.create({
      userId: users[1].dataValues.id,
      paidFor: false,
      date: Date.now(),
      status: 'created',
      stripeToken: 'tok_1DBkbUJopqwPdSjrBg6s2KYx'
    })
  ])

  const orderHistory = await Promise.all([
    OrderBook.create({
      orderId: orders[0].dataValues.id,
      bookId: books[0].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[0].dataValues.id,
      bookId: books[2].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[0].dataValues.id,
      bookId: books[3].dataValues.id,
      quantity: 3
    }),
    OrderBook.create({
      orderId: orders[0].dataValues.id,
      bookId: books[4].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[1].dataValues.id,
      bookId: books[7].dataValues.id,
      quantity: 2
    }),
    OrderBook.create({
      orderId: orders[1].dataValues.id,
      bookId: books[8].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[2].dataValues.id,
      bookId: books[13].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[2].dataValues.id,
      bookId: books[20].dataValues.id,
      quantity: 3
    }),
    OrderBook.create({
      orderId: orders[3].dataValues.id,
      bookId: books[4].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[3].dataValues.id,
      bookId: books[14].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[3].dataValues.id,
      bookId: books[7].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[3].dataValues.id,
      bookId: books[11].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[3].dataValues.id,
      bookId: books[9].dataValues.id,
      quantity: 2
    }),
    OrderBook.create({
      orderId: orders[4].dataValues.id,
      bookId: books[6].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[4].dataValues.id,
      bookId: books[5].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[5].dataValues.id,
      bookId: books[5].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[5].dataValues.id,
      bookId: books[10].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[6].dataValues.id,
      bookId: books[16].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[6].dataValues.id,
      bookId: books[3].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[6].dataValues.id,
      bookId: books[12].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[6].dataValues.id,
      bookId: books[13].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[7].dataValues.id,
      bookId: books[14].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[7].dataValues.id,
      bookId: books[18].dataValues.id,
      quantity: 2
    }),
    OrderBook.create({
      orderId: orders[7].dataValues.id,
      bookId: books[13].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[7].dataValues.id,
      bookId: books[10].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[8].dataValues.id,
      bookId: books[14].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[8].dataValues.id,
      bookId: books[11].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[8].dataValues.id,
      bookId: books[10].dataValues.id
    }),
    OrderBook.create({
      orderId: orders[8].dataValues.id,
      bookId: books[4].dataValues.id
    })
  ])

  // console.log(users[0].dataValues)
  // console.log(books[0].dataValues)

  console.log(`seeded ${books.length} books`)
  console.log(`Books seeded successfully`)
  console.log(`seeded ${users.length} users`)
  console.log(`Users seeded successfully`)
  console.log(`Users seeded successfully`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`Orders seeded successfully`)
  console.log(`seeded ${orderHistory.length} OrderBook entries`)
  console.log(`OrderHistory seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
