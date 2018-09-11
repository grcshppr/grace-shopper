'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Book} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'abby.wigdale@gmail.com',
      password: '',
      firstName: 'Abby',
      lastName: 'Wigdale',
      isAdmin: 'true'
    }),
    User.create({
      email: 'kevingislason@gmail.com',
      password: '',
      firstName: 'Kevin',
      lastName: 'Gislason',
      isAdmin: 'true'
    }),
    User.create({
      email: 'tomasgnr@gmail.com',
      password: '',
      firstName: 'Tomas',
      lastName: 'Mariani',
      isAdmin: 'true'
    }),
    User.create({
      email: 'tony@boetto.com',
      password: '',
      firstName: 'Tony',
      lastName: 'Boetto',
      isAdmin: 'true'
    })
  ])

  const books = await Promise.all([
    Book.create({
      name: ' In Search of Lost Time',
      genres: ['Modernist'],
      author: 'Marcel Proust',
      price: '19.99',
      quantity: '5',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics."`
    }),
    Book.create({
      name: ' In Search of Lost Time',
      genres: ['Modernist'],
      author: 'Marcel Proust',
      price: '14.06',
      quantity: '5',
      editionType: 'paperback',
      imageUrl: '',
      description: `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics."`
    }),
    Book.create({
      name: 'Don Quixote',
      genres: ['Novel'],
      author: 'Miguel de Cervantes',
      price: '28,95',
      quantity: '3',
      editionType: 'hardcover',
      imageUrl: '',
      description: 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.'
    }),
    Book.create({
      name: 'Don Quixote',
      genres: ['Novel'],
      author: 'Miguel de Cervantes',
      price: '11.55',
      quantity: '1',
      editionType: 'paperback',
      imageUrl: '',
      description: 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.'
    }),
    Book.create({
      name: 'Ulysses',
      genres: ['Novel', 'Fiction'],
      author: 'James Joyce',
      price: '16.37',
      quantity: '3',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`
    }),
    Book.create({
      name: 'Ulysses',
      genres: ['Novel', 'Fiction'],
      author: 'James Joyce',
      price: '6.28',
      quantity: '4',
      editionType: 'paperback',
      imageUrl: '',
      description: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`
    }),
    Book.create({
      name: 'The Great Gatsby',
      genres: ['Novel', 'Historical Fiction'],
      author: 'F. Scott Fitzgerald',
      price: '14.95',
      quantity: '8',
      editionType: 'hardcover',
      imageUrl: '',
      description: 'The novel chronicles an era that Fitzgerald himself dubbed the "Jazz Age". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity during the "roaring" 1920s as the economy soared. At the same time, Prohibition, the ban on the sale and manufacture of alcohol as mandated by the Eighteenth Amendment, made millionaires out of bootleggers and led to an increase in organized crime, for example the Jewish mafia. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was uncomfortable with the unrestrained materialism and the lack of morality that went with it, a kind of decadence.'
    }),
    Book.create({
      name: 'The Great Gatsby',
      genres: ['Novel', 'Historical Fiction'],
      author: 'F. Scott Fitzgerald',
      price: '10.29',
      quantity: '5',
      editionType: 'paperback',
      imageUrl: '',
      description: 'The novel chronicles an era that Fitzgerald himself dubbed the "Jazz Age". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity during the "roaring" 1920s as the economy soared. At the same time, Prohibition, the ban on the sale and manufacture of alcohol as mandated by the Eighteenth Amendment, made millionaires out of bootleggers and led to an increase in organized crime, for example the Jewish mafia. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was uncomfortable with the unrestrained materialism and the lack of morality that went with it, a kind of decadence.'
    }),
    Book.create({
      name: 'Moby Dick',
      genres: ['Novel', 'Adventure Fiction', 'Epic', 'Nautical Fiction', 'Encyclopedic Novel'],
      author: 'Herman Melville',
      price: '22.50',
      quantity: '4',
      editionType: 'hardcover',
      imageUrl: '',
      description: `First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, "the greatest novel in American literature." The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel's narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day.`
    }),
    Book.create({
      name: 'Moby Dick',
      genres: ['Novel', 'Adventure Fiction', 'Epic', 'Nautical Fiction', 'Encyclopedic Novel'],
      author: 'Herman Melville',
      price: '12.11',
      quantity: '3',
      editionType: 'paperback',
      imageUrl: '',
      description: `First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, "the greatest novel in American literature." The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel's narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day.`
    }),
    Book.create({
      name: 'Hamlet',
      genres: ['Tragedy', 'Drama'],
      author: 'William Shakespeare',
      price: '9.11',
      quantity: '2',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet's father, the King, and then taken the throne and married Gertrude, Hamlet's mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption.`
    }),
    Book.create({
      name: 'Hamlet',
      genres: ['Tragedy', 'Drama'],
      author: 'William Shakespeare',
      price: '5.87',
      quantity: '2',
      editionType: 'paperback',
      imageUrl: '',
      description: `The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet's father, the King, and then taken the throne and married Gertrude, Hamlet's mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption.`
    }),
    Book.create({
      name: 'War and Peace',
      genres: ['Novel'],
      author: 'Leo Tolstoy',
      price: '19.54',
      quantity: '0',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.`
    }),
    Book.create({
      name: 'War and Peace',
      genres: ['Novel'],
      author: 'Leo Tolstoy',
      price: '19.06',
      quantity: '1',
      editionType: 'paperback',
      imageUrl: '',
      description: `Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.`
    }),
    Book.create({
      name: 'The Odyssey',
      genres: ['Epic', 'Epic Poetry'],
      author: 'Homer',
      price: '12.99',
      quantity: '3',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work traditionally ascribed to Homer. The poem is fundamental to the modern Western canon. Indeed it is the second—the Iliad being the first—extant work of Western literature. It was probably composed near the end of the eighth century BC, somewhere in Ionia, the Greek-speaking coastal region of what is now Turkey. The poem mainly centers on the Greek hero Odysseus (or Ulysses, as he was known in Roman myths) and his long journey home following the fall of Troy. It takes Odysseus ten years to reach Ithaca after the ten-year Trojan War. In his absence, it is assumed he has died, and his wife Penelope and son Telemachus must deal with a group of unruly suitors, the Mnesteres or Proci, competing for Penelope's hand in marriage.`
    }),
    Book.create({
      name: 'The Odyssey',
      genres: ['Epic', 'Epic Poetry'],
      author: 'Homer',
      price: '4.99',
      quantity: '8',
      editionType: 'paperback',
      imageUrl: '',
      description: `The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work traditionally ascribed to Homer. The poem is fundamental to the modern Western canon. Indeed it is the second—the Iliad being the first—extant work of Western literature. It was probably composed near the end of the eighth century BC, somewhere in Ionia, the Greek-speaking coastal region of what is now Turkey. The poem mainly centers on the Greek hero Odysseus (or Ulysses, as he was known in Roman myths) and his long journey home following the fall of Troy. It takes Odysseus ten years to reach Ithaca after the ten-year Trojan War. In his absence, it is assumed he has died, and his wife Penelope and son Telemachus must deal with a group of unruly suitors, the Mnesteres or Proci, competing for Penelope's hand in marriage.`
    }),
    Book.create({
      name: 'One Hundred Years of Solitude',
      genres: ['Novel', 'Magical Realism'],
      author: 'Gabriel Garcia Marquez',
      price: '19.37',
      quantity: '4',
      editionType: 'hardcover',
      imageUrl: '',
      description: `One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career. The novel tells the story of the rise and fall of the mythical town of Macondo through the history of the Buendía family. It is a rich and brilliant chronicle of life and death, and the tragicomedy of humankind. In the noble, ridiculous, beautiful, and tawdry story of the Buendía family, one sees all of humanity, just as in the history, myths, growth, and decay of Macondo, one sees all of Latin America. Love and lust, war and revolution, riches and poverty, youth and senility — the variety of life, the endlessness of death, the search for peace and truth — these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel García Márquez always writes with the simplicity, ease, andpurity that are the mark of a master. Alternately reverential and comical, One Hundred Years of Solitude weaves the political, personal, and spiritual to bring a new consciousness to storytelling. Translated into dozens of languages, this stunning work is no less than an accounting of the history of the human race.`
    }),
    Book.create({
      name: 'One Hundred Years of Solitude',
      genres: ['Novel', 'Magical Realism'],
      author: 'Gabriel Garcia Marquez',
      price: '13.96',
      quantity: '10',
      editionType: 'paperback',
      imageUrl: '',
      description: `One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career. The novel tells the story of the rise and fall of the mythical town of Macondo through the history of the Buendía family. It is a rich and brilliant chronicle of life and death, and the tragicomedy of humankind. In the noble, ridiculous, beautiful, and tawdry story of the Buendía family, one sees all of humanity, just as in the history, myths, growth, and decay of Macondo, one sees all of Latin America. Love and lust, war and revolution, riches and poverty, youth and senility — the variety of life, the endlessness of death, the search for peace and truth — these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel García Márquez always writes with the simplicity, ease, andpurity that are the mark of a master. Alternately reverential and comical, One Hundred Years of Solitude weaves the political, personal, and spiritual to bring a new consciousness to storytelling. Translated into dozens of languages, this stunning work is no less than an accounting of the history of the human race.`
    }),
    Book.create({
      name: 'The Divine Comedy',
      genres: ['Epic Poetry'],
      author: 'Dante Alighieri',
      price: '16.60',
      quantity: '2',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.`
    }),
    Book.create({
      name: 'The Divine Comedy',
      genres: ['Epic Poetry'],
      author: 'Dante Alighieri',
      price: '16.60',
      quantity: '0',
      editionType: 'paperback',
      imageUrl: '',
      description: `Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.`
    }),
    Book.create({
      name: 'The Brothers Karamazov',
      genres: ['Philosophical Fiction'],
      author: 'Fyodor Dostoyevsky',
      price: '19.20',
      quantity: '0',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Dostoevsky's last and greatest novel, The Karamazov Brothers, is both a brilliantly told crime story and a passionate philosophical debate. The dissolute landowner Fyodor Pavlovich Karamazov is murdered; his sons — the atheist intellectual Ivan, the hot-blooded Dmitry, and the saintly novice Alyosha — are all at some level involved. Bound up with this intense family drama is Dostoevsky's exploration of many deeply felt ideas about the existence of God, the question of human freedom, the collective nature of guilt, the disastrous consequences of rationalism. The novel is also richly comic: the Russian Orthodox Church, the legal system, and even the author's most cherished causes and beliefs are presented with a note of irreverence, so that orthodoxy and radicalism, sanity and madness, love and hatred, right and wrong are no longer mutually exclusive. Rebecca West considered it "the allegory for the world's maturity, but with children to the fore." This new translation does full justice to Dostoevsky's genius, particularly in the use of the spoken word, which ranges over every mode of human expression.`
    }),
    Book.create({
      name: 'The Brothers Karamazov',
      genres: ['Philosophical Fiction'],
      author: 'Fyodor Dostoyevsky',
      price: '6.93',
      quantity: '6',
      editionType: 'paperback',
      imageUrl: '',
      description: `Dostoevsky's last and greatest novel, The Karamazov Brothers, is both a brilliantly told crime story and a passionate philosophical debate. The dissolute landowner Fyodor Pavlovich Karamazov is murdered; his sons — the atheist intellectual Ivan, the hot-blooded Dmitry, and the saintly novice Alyosha — are all at some level involved. Bound up with this intense family drama is Dostoevsky's exploration of many deeply felt ideas about the existence of God, the question of human freedom, the collective nature of guilt, the disastrous consequences of rationalism. The novel is also richly comic: the Russian Orthodox Church, the legal system, and even the author's most cherished causes and beliefs are presented with a note of irreverence, so that orthodoxy and radicalism, sanity and madness, love and hatred, right and wrong are no longer mutually exclusive. Rebecca West considered it "the allegory for the world's maturity, but with children to the fore." This new translation does full justice to Dostoevsky's genius, particularly in the use of the spoken word, which ranges over every mode of human expression.`
    }),
    Book.create({
      name: 'Madame Bovary',
      genres: ['Literary Realism'],
      author: 'Gustave Flaubert',
      price: '22.00',
      quantity: '5',
      editionType: 'hardcover',
      imageUrl: '',
      description: `For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for "offenses against morality and religion." What shocks us today about Flaubert's devastatingly realized tale of a young woman destroyed by the reckless pursuit of her romantic dreams is its pure artistry: the poise of its narrative structure, the opulence of its prose (marvelously captured in the English translation of Francis Steegmuller), and its creation of a world whose minor figures are as vital as its doomed heroine. In reading Madame Bovary, one experiences a work that remains genuinely revolutionary almost a century and a half after its creation.`
    }),
    Book.create({
      name: 'Madame Bovary',
      genres: ['Literary Realism'],
      author: 'Gustave Flaubert',
      price: '5.99',
      quantity: '10',
      editionType: 'paperback',
      imageUrl: '',
      description: `For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for "offenses against morality and religion." What shocks us today about Flaubert's devastatingly realized tale of a young woman destroyed by the reckless pursuit of her romantic dreams is its pure artistry: the poise of its narrative structure, the opulence of its prose (marvelously captured in the English translation of Francis Steegmuller), and its creation of a world whose minor figures are as vital as its doomed heroine. In reading Madame Bovary, one experiences a work that remains genuinely revolutionary almost a century and a half after its creation.`
    }),
    Book.create({
      name: 'The Adventures of Huckleberry Finn',
      genres: ['Picaresque Fiction'],
      author: 'Mark Twain',
      price: '12.50',
      quantity: '0',
      editionType: 'hardcover',
      imageUrl: '',
      description: `Revered by all of the town's children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literature. Unlike the tall-tale, idyllic world of Tom Sawyer, The Adventures of Huckleberry Finn is firmly grounded in early reality. From the abusive drunkard who serves as Huckleberry's father, to Huck's first tentative grappling with issues of personal liberty and the unknown, Huckleberry Finn endeavors to delve quite a bit deeper into the complexities — both joyful and tragic of life`
    }),
    Book.create({
      name: 'The Adventures of Huckleberry Finn',
      genres: ['Picaresque Fiction'],
      author: 'Mark Twain',
      price: '8.99',
      quantity: '4',
      editionType: 'paperback',
      imageUrl: '',
      description: `Revered by all of the town's children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literature. Unlike the tall-tale, idyllic world of Tom Sawyer, The Adventures of Huckleberry Finn is firmly grounded in early reality. From the abusive drunkard who serves as Huckleberry's father, to Huck's first tentative grappling with issues of personal liberty and the unknown, Huckleberry Finn endeavors to delve quite a bit deeper into the complexities — both joyful and tragic of life`
    }),
    Book.create({
      name: 'Lolita',
      genres: ['Novel'],
      author: 'Vladimir Nabokov',
      price: '19.76',
      quantity: '3',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The book is internationally famous for its innovative style and infamous for its controversial subject: the protagonist and unreliable narrator, middle aged Humbert Humbert, becomes obsessed and sexually involved with a twelve-year-old girl named Dolores Haze.`
    }),
    Book.create({
      name: 'Lolita',
      genres: ['Novel'],
      author: 'Vladimir Nabokov',
      price: '9.99',
      quantity: '9',
      editionType: 'paperback',
      imageUrl: '',
      description: `The book is internationally famous for its innovative style and infamous for its controversial subject: the protagonist and unreliable narrator, middle aged Humbert Humbert, becomes obsessed and sexually involved with a twelve-year-old girl named Dolores Haze.`
    }),
    Book.create({
      name: 'The Iliad',
      genres: ['Poetry', 'Epic Poetry', 'Epic'],
      author: 'Homer',
      price: '16.32',
      quantity: '1',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The Iliad is an epic poem in dactylic hexameters, traditionally attributed to Homer. Set in the Trojan War, the ten-year siege of Ilium by a coalition of Greek states, it tells of the battles and events during the weeks of a quarrel between King Agamemnon and the warrior Achilles. Although the story covers only a few weeks in the final year of the war, the Iliad mentions or alludes to many of the Greek legends about the siege. Along with the Odyssey, also attributed to Homer, the Iliad is among the oldest extant works of Western literature, and its written version is usually dated to around the eighth century BC. The Iliad contains approximately 15,700 lines, and is written in a literary amalgam of several Greek dialects. The authorship of the poem is disputed.`
    }),
    Book.create({
      name: 'The Iliad',
      genres: ['Poetry', 'Epic Poetry', 'Epic'],
      author: 'Homer',
      price: '14.53',
      quantity: '11',
      editionType: 'papoerback',
      imageUrl: '',
      description: `The Iliad is an epic poem in dactylic hexameters, traditionally attributed to Homer. Set in the Trojan War, the ten-year siege of Ilium by a coalition of Greek states, it tells of the battles and events during the weeks of a quarrel between King Agamemnon and the warrior Achilles. Although the story covers only a few weeks in the final year of the war, the Iliad mentions or alludes to many of the Greek legends about the siege. Along with the Odyssey, also attributed to Homer, the Iliad is among the oldest extant works of Western literature, and its written version is usually dated to around the eighth century BC. The Iliad contains approximately 15,700 lines, and is written in a literary amalgam of several Greek dialects. The authorship of the poem is disputed.`
    }),
    Book.create({
      name: 'Crime and Punishment',
      genres: ['Philosophical Fiction'],
      author: 'Fyodor Dostoyevsky',
      price: '25.11',
      quantity: '5',
      editionType: 'hardcover',
      imageUrl: '',
      description: `It is a murder story, told from a murder;s point of view, that implicates even the most innocent reader in its enormities. It is a cat-and-mouse game between a tormented young killer and a cheerfully implacable detective. It is a preternaturally acute investigation of the forces that impel a man toward sin, suffering, and grace. Ever since its publication in 1866 Crime and Punishment has intrigued readers and sorely tested translators, the best of whom seemed to capture one facet of Dostoevsky's masterpiece while missing the rest.`
    }),
    Book.create({
      name: 'Crime and Punishment',
      genres: ['Philosophical Fiction'],
      author: 'Fyodor Dostoyevsky',
      price: '7.00',
      quantity: '5',
      editionType: 'paperback',
      imageUrl: '',
      description: `It is a murder story, told from a murder;s point of view, that implicates even the most innocent reader in its enormities. It is a cat-and-mouse game between a tormented young killer and a cheerfully implacable detective. It is a preternaturally acute investigation of the forces that impel a man toward sin, suffering, and grace. Ever since its publication in 1866 Crime and Punishment has intrigued readers and sorely tested translators, the best of whom seemed to capture one facet of Dostoevsky's masterpiece while missing the rest.`
    }),
    Book.create({
      name: `Alice's Adventures in Wonderland`,
      genres: ['Children', 'Fantasy'],
      author: 'Lewis Carroll',
      price: '19.60',
      quantity: '11',
      editionType: 'hardcover',
      imageUrl: '',
      description: `In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole. Thus began the immortal adventures of Alice, perhaps the most popular heroine in English literature. Countless scholars have tried to define the charm of the Alice books–with those wonderfully eccentric characters the Queen of Hearts, Tweedledum, and Tweedledee, the Cheshire Cat, Mock Turtle, the Mad Hatter et al.–by proclaiming that they really comprise a satire on language, a political allegory, a parody of Victorian children’s literature, even a reflection of contemporary ecclesiastical history. Perhaps, as Dodgson might have said, Alice is no more than a dream, a fairy tale about the trials and tribulations of growing up–or down, or all turned round–as seen through the expert eyes of a child.`
    }),
    Book.create({
      name: `Alice's Adventures in Wonderland`,
      genres: ['Children', 'Fantasy'],
      author: 'Lewis Carroll',
      price: '3.69',
      quantity: '12',
      editionType: 'paperback',
      imageUrl: '',
      description: `In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole. Thus began the immortal adventures of Alice, perhaps the most popular heroine in English literature. Countless scholars have tried to define the charm of the Alice books–with those wonderfully eccentric characters the Queen of Hearts, Tweedledum, and Tweedledee, the Cheshire Cat, Mock Turtle, the Mad Hatter et al.–by proclaiming that they really comprise a satire on language, a political allegory, a parody of Victorian children’s literature, even a reflection of contemporary ecclesiastical history. Perhaps, as Dodgson might have said, Alice is no more than a dream, a fairy tale about the trials and tribulations of growing up–or down, or all turned round–as seen through the expert eyes of a child.`
    }),
    Book.create({
      name: 'Wuthering Heights',
      genres: ['Tragedy', 'Gothic Fiction'],
      author: 'Emily Brontë',
      price: '10.29',
      quantity: '3',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The narrative is non-linear, involving several flashbacks, and two primary narrators: Mr. Lockwood and Ellen "Nelly" Dean. The novel opens in 1801, with Mr. Lockwood arriving at Thrushcross Grange, a grand house on the Yorkshire moors that he is renting from the surly Heathcliff, who lives at nearby Wuthering Heights. Lockwood is treated rudely, and coldly by the brooding, unsociable Heathcliff, and is forced to stay at Wuthering Heights for a night because one of the savage dogs of the Heights attacks him, and the weather turns against him. The housekeeper cautiously takes him to a chamber to sleep through the night and warns him to not speak to Heathcliff about where he is sleeping, for he would get in deep trouble.`
    }),
    Book.create({
      name: 'Wuthering Heights',
      genres: ['Tragedy', 'Gothic Fiction'],
      author: 'Emily Brontë',
      price: '4.50',
      quantity: '2',
      editionType: 'paperback',
      imageUrl: '',
      description: `The narrative is non-linear, involving several flashbacks, and two primary narrators: Mr. Lockwood and Ellen "Nelly" Dean. The novel opens in 1801, with Mr. Lockwood arriving at Thrushcross Grange, a grand house on the Yorkshire moors that he is renting from the surly Heathcliff, who lives at nearby Wuthering Heights. Lockwood is treated rudely, and coldly by the brooding, unsociable Heathcliff, and is forced to stay at Wuthering Heights for a night because one of the savage dogs of the Heights attacks him, and the weather turns against him. The housekeeper cautiously takes him to a chamber to sleep through the night and warns him to not speak to Heathcliff about where he is sleeping, for he would get in deep trouble.`
    }),
    Book.create({
      name: 'Pride and Prejudice',
      genres: ['Novel', 'Satire', 'Fiction', 'Romance Novel', 'Novel of Manners'],
      author: 'Jane Austen',
      price: '8.73',
      quantity: '15',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The book is narrated in free indirect speech following the main character Elizabeth Bennet as she deals with matters of upbringing, marriage, moral rightness and education in her aristocratic society. Though the book's setting is uniquely turn of the 19th century, it remains a fascination of modern readership, continuing to remain at the top of lists titled "most loved books of all time", and receiving considerable attention from literary critics. This modern interest has resulted in a number of dramatic adaptations and a plethora of books developing Austen's memorable characters further.`
    }),
    Book.create({
      name: 'Pride and Prejudice',
      genres: ['Novel', 'Satire', 'Fiction', 'Romance Novel', 'Novel of Manners'],
      author: 'Jane Austen',
      price: '3.95',
      quantity: '20',
      editionType: 'paperback',
      imageUrl: '',
      description: `The book is narrated in free indirect speech following the main character Elizabeth Bennet as she deals with matters of upbringing, marriage, moral rightness and education in her aristocratic society. Though the book's setting is uniquely turn of the 19th century, it remains a fascination of modern readership, continuing to remain at the top of lists titled "most loved books of all time", and receiving considerable attention from literary critics. This modern interest has resulted in a number of dramatic adaptations and a plethora of books developing Austen's memorable characters further.`
    }),
    Book.create({
      name: 'The Catcher in the Rye',
      genres: ['Literary Realism', 'Coming-of-Age Fiction'],
      author: 'J. D. Salinger',
      price: '20.34',
      quantity: '6',
      editionType: 'hardcover',
      imageUrl: '',
      description: `The Catcher in the Rye is a 1945 novel by J. D. Salinger. Originally published for adults, the novel has become a common part of high school and college curricula throughout the English-speaking world; it has also been translated into almost all of the world's major languages. Around 250,000 copies are sold each year, with total sales of more than sixty-five million. The novel's antihero, Holden Caulfield, has become an icon for teenage rebellion.`
    }),
    Book.create({
      name: 'The Catcher in the Rye',
      genres: ['Literary Realism', 'Coming-of-Age Fiction'],
      author: 'J. D. Salinger',
      price: '8.99',
      quantity: '18',
      editionType: 'paperback',
      imageUrl: '',
      description: `The Catcher in the Rye is a 1945 novel by J. D. Salinger. Originally published for adults, the novel has become a common part of high school and college curricula throughout the English-speaking world; it has also been translated into almost all of the world's major languages. Around 250,000 copies are sold each year, with total sales of more than sixty-five million. The novel's antihero, Holden Caulfield, has become an icon for teenage rebellion.`
    })
  ])

  console.log(`seeded ${books.length} books`)
  console.log(`Books seeded successfully`)
  console.log(`seeded ${users.length} users`)
  console.log(`Users seeded successfully`)
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
