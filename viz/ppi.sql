CREATE TABLE `ppi_edge` (
  `p1id` int(5) DEFAULT NULL,
  `p2id` int(5) DEFAULT NULL,
  `docking_score` decimal(9,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `ppi_compatible` (
  `receptor` int(5) DEFAULT NULL,
  `p1id` int(5) DEFAULT NULL,
  `p2id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `ppi_node` (
  `id` int(5) DEFAULT NULL,
  `label` varchar(11) DEFAULT NULL,
  `pdb` varchar(6) DEFAULT NULL,
  `uniprot` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `ppi_node` (`id`, `label`, `pdb`, `uniprot`) VALUES
(1, 'A4', '1AAP', 'P05067'), (2, 'APBA1', '1AQC', 'Q02410'), (3, 'APOA1', '1AV1', 'P02647'), (4, 'COIA1', '1BNL', 'P39060'), (5, 'BLMH', '1CB5', 'Q13867'), (6, 'SHC1', '1MIL', 'P29353'), (7, 'TGFB2', '1TFG', 'P61812'), (8, 'CALR', '2CLR', 'P27797'), (9, 'HOME3', '2P8V', 'Q9NSC5'), (10, 'APLP1', '3PMR', 'P51693'), (11, 'APLP2', '5JBT', 'Q06481');
INSERT INTO `ppi_edge` (`p1id`, `p2id`, `docking_score`) VALUES
(1, 2, '1174.127'), (1, 3, '1123.730'), (1, 4, '1143.410'), (1, 5, '1411.025'), (1, 6, '731.988'), (1, 7, '1057.454'), (1, 8, '1051.402'), (1, 9, '1057.780'), (1, 10, '1133.499'), (1, 11, '1102.025'), (10, 11, '1162.250');
INSERT INTO `ppi_compatible` (`receptor`, `p1id`, `p2id`) VALUES
(1, 8, 7), (1, 7, 11), (1, 7, 9), (1, 7, 6), (1, 7, 4), (1, 7, 2), (1, 7, 10), (1, 11, 6), (1, 9, 6), (1, 6, 5), (1, 6, 10), (10, 11, 1);
